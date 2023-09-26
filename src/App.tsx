import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInput from "./components/CustomInput";

import { z } from "zod";
import { useEffect } from "react";

const formSchema = z.object({
  data: z.object({
    nome: z.string().nonempty("Nome é obrigatório"),
    sobrenome: z.string().nonempty("Sobrenome é obrigatório"),
    email: z.string().email("Email inválido").nonempty("Email é obrigatório"),
    cpf: z.string().nonempty("CPF é obrigatório"),
  }),
});

type FormProps = z.infer<typeof formSchema>;

function App() {
  const {
    control,
    formState: { errors },
    watch,
    handleSubmit,
    setValue,
  } = useForm<FormProps>({
    resolver: zodResolver(formSchema),
    mode: "all",
    criteriaMode: "all",
    defaultValues: {
      data: {
        nome: "",
        sobrenome: "",
        email: "",
        cpf: "",
      },
    },
  });

  const cpfValue = watch("data.cpf");

  const cpfMask = (cpf: string) => {
    cpf = cpf.replace(/\D/g, "");

    cpf = cpf.slice(0, 11);

    if (cpf.length >= 4) {
      cpf = cpf.slice(0, 3) + "." + cpf.slice(3);
    }
    if (cpf.length >= 8) {
      cpf = cpf.slice(0, 7) + "." + cpf.slice(7);
    }
    if (cpf.length >= 12) {
      cpf = cpf.slice(0, 11) + "-" + cpf.slice(11);
    }

    return cpf;
  };

  const onSubmit = (data: FormProps) => console.log(data);

  useEffect(() => {
    setValue("data.cpf", cpfMask(cpfValue));
  }, [cpfValue, setValue]);

  return (
    <section className="max-w-3xl mx-auto py-8 px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Controller
          control={control}
          name="data.nome"
          render={({ field: { name, onBlur, onChange, value, ref } }) => (
            <CustomInput
              id="nome"
              label="Nome"
              isRequired
              type="text"
              name={name}
              value={value}
              error={errors.data?.nome?.message}
              onChange={onChange}
              onBlur={onBlur}
              ref={ref}
            />
          )}
        />
        <Controller
          control={control}
          name="data.sobrenome"
          render={({ field: { name, onBlur, onChange, value, ref } }) => (
            <CustomInput
              id="sobrenome"
              label="Sobrenome"
              isRequired
              type="text"
              name={name}
              value={value}
              error={errors.data?.sobrenome?.message}
              onChange={onChange}
              onBlur={onBlur}
              ref={ref}
            />
          )}
        />
        <Controller
          control={control}
          name="data.email"
          render={({ field: { name, onBlur, onChange, value, ref } }) => (
            <CustomInput
              id="email"
              label="E-mail"
              isRequired
              type="email"
              name={name}
              value={value}
              error={errors.data?.email?.message}
              onChange={onChange}
              onBlur={onBlur}
              ref={ref}
            />
          )}
        />
        <Controller
          control={control}
          name="data.cpf"
          render={({ field: { name, onBlur, onChange, value, ref } }) => (
            <CustomInput
              id="cpf"
              label="CPF"
              isRequired
              type="text"
              maxLength={14}
              name={name}
              value={value}
              error={errors.data?.cpf?.message}
              onChange={onChange}
              onBlur={onBlur}
              ref={ref}
            />
          )}
        />
        <button
          type="submit"
          className="cursor-pointer w-full bg-slate-500 text-white h-12 mt-5 rounded-full transition-all duration-300 hover:shadow-md"
        >
          Enviar
        </button>
      </form>
    </section>
  );
}

export default App;
