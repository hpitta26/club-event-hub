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
    <div className="bg-stone-400 w-96 px-14 pt-7 pb-16 rounded-xl flex flex-col justify-center gap-5">
      <div className="flex flex-col text-center">
        <p className="text-xl">{title}</p>
        {subtitle && <p className="text-xs">{subtitle}</p>}
      </div>
      <form className="flex flex-col gap-3" onSubmit={onSubmit}>
        {fields.map((field) => (
          <div className="flex flex-col gap-2" key={field.name}>
            <label htmlFor={field.name} className="text-sm font-bold">
              {field.label}
            </label>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className="px-2 rounded-md focus:outline-none bg-stone-200 py-1"
              required
            />
          </div>
        ))}
        <button className="bg-stone-200 rounded-md py-2 mt-2 hover:bg-stone-300 font-bold">
          {children}
        </button>
      </form>
    </div>
  );
};

export default FormContainer;
