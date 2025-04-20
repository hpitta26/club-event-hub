import { useState } from "react"
import { BsEmojiTear, BsEmojiFrown, BsEmojiNeutral, BsEmojiSmile, BsEmojiGrin } from "react-icons/bs";
import { FaRegCircleCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";


export default function SurveyModal({ isOpen, onClose, eventName, eventDate, eventHost }) {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    overallSentiment: 3, // 1-5 scale
    enjoymentLevel: 50, // 0-100 scale
    learningValue: 50, // 0-100 scale
    organizationQuality: 50, // 0-100 scale
    emotionalResponse: "", // Selected emoji
    keywordTags: [], // Selected tags
    highlightMoment: "", // Text response
    improvementFeedback: "", // Text response
    likelyToRecommend: 7, // 0-10 NPS scale
  })

  const totalSteps = 3
  const progress = (step / totalSteps) * 100

  // Predefined tags for quick sentiment capture
  const positiveTags = ["Inspiring", "Informative", "Well-organized", "Engaging", "Fun"]
  const neutralTags = ["Adequate", "Expected", "Standard", "Typical"]
  const negativeTags = ["Boring", "Confusing", "Disorganized", "Too long", "Rushed"]

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const toggleTag = (tag) => {
    const currentTags = [...formData.keywordTags]
    if (currentTags.includes(tag)) {
      handleInputChange(
        "keywordTags",
        currentTags.filter((t) => t !== tag),
      )
    } else {
      handleInputChange("keywordTags", [...currentTags, tag])
    }
  }

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = async () => {
    console.log("Submitting survey data:", formData)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSubmitted(true)
  }

  const resetAndClose = () => {
    setStep(1)
    setSubmitted(false)
    setFormData({
      overallSentiment: 3,
      enjoymentLevel: 50,
      learningValue: 50,
      organizationQuality: 50,
      emotionalResponse: "",
      keywordTags: [],
      highlightMoment: "",
      improvementFeedback: "",
      likelyToRecommend: 7,
    })
    onClose()
  }

  if (!isOpen) return null

  const sentimentEmojis = [
    { value: "very_negative", icon: BsEmojiTear, label: "Very Negative" },
    { value: "negative", icon: BsEmojiFrown, label: "Negative" },
    { value: "neutral", icon: BsEmojiNeutral, label: "Neutral" },
    { value: "positive", icon: BsEmojiSmile, label: "Positive" },
    { value: "very_positive", icon: BsEmojiGrin, label: "Very Positive" },
  ]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-100 p-4">
      <div className="w-full max-w-md max-h-[90vh] overflow-auto">
        <div className="w-full bg-[#f2f0eb] border-2 border-black rounded-3xl">
          {/* Header */}
          <div className="relative border-b border-gray-200 p-6">
            <button
              className="absolute right-4 top-4 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors"
              onClick={resetAndClose}
              aria-label="Close"
            >
              <IoClose className="h-5 w-5" />
            </button>

            {!submitted ? (
              <>
                <div className="flex justify-between items-center mb-3 pr-6">
                  <h2 className="text-xl font-bold">{eventName}</h2>
                  <span className="text-sm bg-gray-200 text-black px-2 py-1 rounded-full">
                    {step}/{totalSteps}
                  </span>
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="pt-2 text-sm text-gray-600">
                  {eventDate} • Hosted by: {eventHost}
                </p>
              </>
            ) : (
              <>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center bg-green-100 rounded-full">
                  <FaRegCircleCheck className="h-10 w-10 text-green-500" />
                </div>
                <h2 className="text-center text-2xl font-bold">Thank You!</h2>
                <p className="text-center text-gray-600">
                  Your feedback for {eventName} has been submitted successfully.
                </p>
              </>
            )}
          </div>

          {!submitted ? (
            <>
              {/* Content */}
              <div className="p-6">
                {step === 1 && (
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <label className="text-center block text-lg font-medium">How did you feel about the event?</label>
                      <div className="flex justify-between items-center gap-2 py-4">
                        {sentimentEmojis.map((emoji) => {
                          const Icon = emoji.icon
                          return (
                            <div
                              key={emoji.value}
                              className={`flex flex-col items-center gap-2 cursor-pointer transition-all`}
                              onClick={() => handleInputChange("emotionalResponse", emoji.value)}
                            >
                              <div
                                className={`p-3 rounded-full ${
                                  formData.emotionalResponse === emoji.value
                                    ? "bg-blue-100 border-2 border-blue-500"
                                    : "bg-white border border-gray-200 hover:border-blue-300"
                                }`}
                              >
                                <Icon
                                  className={`h-8 w-8 ${
                                    formData.emotionalResponse === emoji.value ? "text-blue-500" : "text-gray-500"
                                  }`}
                                />
                              </div>
                              <span className="text-xs font-medium text-gray-600">{emoji.label}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    <div className="space-y-3 pt-4">
                      <label className="text-lg font-medium">How would you rate your enjoyment?</label>
                      <div className="space-y-4 pt-2">
                        <div className="bg-white p-4 rounded-2xl border border-gray-200">
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={formData.enjoymentLevel}
                            onChange={(e) => handleInputChange("enjoymentLevel", parseInt(e.target.value))}
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-gray-600 mt-2">
                            <span>Not enjoyable</span>
                            <span className="text-center font-medium">{formData.enjoymentLevel}%</span>
                            <span>Very enjoyable</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <label className="text-lg font-medium">How would you describe this event?</label>
                      <div className="space-y-4">
                        <div className="bg-white p-4 rounded-2xl border border-gray-200">
                          <p className="font-medium mb-2 text-sm text-gray-600">Positive Vibes</p>
                          <div className="flex flex-wrap gap-2">
                            {positiveTags.map((tag) => (
                              <button
                                key={tag}
                                type="button"
                                onClick={() => toggleTag(tag)}
                                className={`px-3 py-1 rounded-full transition-colors ${
                                  formData.keywordTags.includes(tag)
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                              >
                                {tag}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="bg-white p-4 rounded-2xl border border-gray-200">
                          <p className="font-medium mb-2 text-sm text-gray-600">Neutral Thoughts</p>
                          <div className="flex flex-wrap gap-2">
                            {neutralTags.map((tag) => (
                              <button
                                key={tag}
                                type="button"
                                onClick={() => toggleTag(tag)}
                                className={`px-3 py-1 rounded-full transition-colors ${
                                  formData.keywordTags.includes(tag)
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                              >
                                {tag}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="bg-white p-4 rounded-2xl border border-gray-200">
                          <p className="font-medium mb-2 text-sm text-gray-600">Needs Improvement</p>
                          <div className="flex flex-wrap gap-2">
                            {negativeTags.map((tag) => (
                              <button
                                key={tag}
                                type="button"
                                onClick={() => toggleTag(tag)}
                                className={`px-3 py-1 rounded-full transition-colors ${
                                  formData.keywordTags.includes(tag)
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                              >
                                {tag}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <label className="text-lg font-medium">How well was the event organized?</label>
                      <div className="bg-white p-4 rounded-2xl border border-gray-200">
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={[formData.organizationQuality]}
                            onChange={(e) => handleInputChange("organizationQuality", parseInt(e.target.value))}
                            className="w-full"
                          />
                        <div className="flex justify-between text-xs text-gray-600 mt-2">
                          <span>Poorly organized</span>
                          <span className="text-center font-medium">{formData.organizationQuality}%</span>
                          <span>Very well organized</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-lg font-medium">Would you recommend this to others?</label>
                      <div className="bg-white p-4 rounded-2xl border border-gray-200">
                        <div className="flex justify-between items-center">
                          <span className="text-xl font-medium">{formData.likelyToRecommend}</span>
                          <div
                            className={`text-sm font-medium px-2 py-1 rounded-full ${
                              formData.likelyToRecommend >= 9
                                ? "bg-green-100 text-green-700"
                                : formData.likelyToRecommend >= 7
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-red-100 text-red-700"
                            }`}
                          >
                            {formData.likelyToRecommend >= 9
                              ? "Promoter"
                              : formData.likelyToRecommend >= 7
                                ? "Passive"
                                : "Detractor"}
                          </div>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="10"
                            step="1"
                            value={[formData.likelyToRecommend]}
                            onChange={(e) => handleInputChange("likelyToRecommend", parseInt(e.target.value))}
                            className="w-full"
                          />
                        <div className="flex justify-between text-xs text-gray-600">
                          <span>Not likely (0)</span>
                          <span>Very likely (10)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex justify-between p-6 border-t border-gray-200">
                {step > 1 ? (
                  <button
                    onClick={handleBack}
                    className="px-6 py-2 bg-white text-black rounded-full border border-gray-300 font-medium transition-colors hover:bg-gray-100"
                  >
                    Back
                  </button>
                ) : (
                  <div></div>
                )}
                <button
                  onClick={handleNext}
                  className="px-6 py-2 bg-blue-500 text-white rounded-full font-medium transition-colors hover:bg-blue-600"
                >
                  {step === totalSteps ? "Submit" : "Next"}
                </button>
              </div>
            </>
          ) : (
            <div className="flex justify-center p-6 border-t border-gray-200">
              <button
                onClick={resetAndClose}
                className="px-8 py-3 bg-blue-500 text-white rounded-full font-medium transition-colors hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
