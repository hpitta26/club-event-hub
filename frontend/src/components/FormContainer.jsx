const FormContainer = ({
  title,
  subtitle = "",
  fields,
  onSubmit,
  formData,
  handleChange,
  children,
}) => {
  return (
    <div className="bg-stone-400 w-11/12 max-w-xs sm:max-w-sm md:max-w-md mx-auto px-4 sm:px-8 md:px-10 lg:px-14 pt-5 sm:pt-7 pb-12 sm:pb-16 rounded-xl flex flex-col justify-center gap-3 sm:gap-5">
      <div className="flex flex-col text-center">
        <p className="text-lg sm:text-xl font-medium">{title}</p>
        {subtitle && <p className="text-xs sm:text-sm">{subtitle}</p>}
      </div>
      <form className="flex flex-col gap-2 sm:gap-3 w-full" onSubmit={onSubmit}>
        {fields.map((field) => (
          <div className="flex flex-col gap-1 sm:gap-2" key={field.name}>
            <label
              htmlFor={field.name}
              className="text-xs sm:text-sm font-bold"
            >
              {field.label}
            </label>
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className="px-2 rounded-md focus:outline-none bg-stone-200 py-1 text-sm sm:text-base w-full"
              required
            />
          </div>
        ))}
        <button
          type="submit"
          name="submit"
          className="bg-stone-200 rounded-md py-1.5 sm:py-2 mt-2 sm:mt-3 hover:bg-stone-300 font-bold text-sm sm:text-base transition-colors duration-200"
        >
          {children}
        </button>
      </form>
    </div>
  );
};

export default FormContainer;
