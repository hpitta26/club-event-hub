import React from "react";

const FormContainer = ({
  title,
  subtitle = "",
  fields,
  onSubmit,
  formData,
  handleChange,
  children,
}) => {
  const renderField = (field) => {
    if (field.type === "radio") {
      return (
        <div className="flex flex-col gap-2" key={field.name}>
          <label className="text-sm sm:text-base font-bold">
            {field.label}
          </label>
          <div className="flex flex-wrap gap-4">
            {field.options.map((option) => (
              <div
                key={option.value}
                className={`px-4 py-2 rounded-md cursor-pointer text-center text-sm sm:text-base
                    ${
                      formData[field.name] === option.value
                        ? "bg-stone-500 text-white"
                        : "bg-stone-200 text-black hover:bg-stone-300"
                    }`}
                onClick={() => {
                  const event = {
                    target: { name: field.name, value: option.value },
                  };
                  handleChange(event);
                }}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      );
    } else if (field.type === "textarea") {
      return (
        <div className="flex flex-col gap-2" key={field.name}>
          <label
            htmlFor={field.name}
            className="text-sm sm:text-base font-bold"
          >
            {field.label}
          </label>
          <textarea
            id={field.name}
            name={field.name}
            value={formData[field.name] || ""}
            onChange={handleChange}
            rows={field.rows || 6}
            className="px-3 rounded-md focus:outline-none bg-stone-200 py-2 text-sm sm:text-base w-full resize-none"
            required={field.required}
          />
        </div>
      );
    } else {
      return (
        <div className="flex flex-col gap-1" key={field.name}>
          <label
            htmlFor={field.name}
            className="text-sm sm:text-base font-bold"
          >
            {field.label}
          </label>
          <input
            type={field.type}
            id={field.name}
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            className="px-3 rounded-md focus:outline-none bg-stone-200 py-2 text-sm sm:text-base w-full"
            required
          />
        </div>
      );
    }
  };

  return (
    <div className="bg-stone-400 w-screen max-w-sm sm:w-96 h-auto  mx-auto px-6 sm:px-8 md:px-10 pt-6 pb-10 rounded-xl flex flex-col justify-center gap-4">
      <div className="flex flex-col text-center mb-5">
        <p className="text-xl sm:text-2xl font-medium">{title}</p>
        {subtitle && <p className="text-sm sm:text-base">{subtitle}</p>}
      </div>
      <form className="flex flex-col gap-5 w-full" onSubmit={onSubmit}>
        {fields.map((field) => renderField(field))}
        <button
          type="submit"
          name="submit"
          className="bg-stone-200 rounded-md py-2 sm:py-2.5 mt-3 sm:mt-4 hover:bg-stone-300 font-bold text-base sm:text-lg transition-colors duration-200"
        >
          {children}
        </button>
      </form>
    </div>
  );
};

export default FormContainer;
