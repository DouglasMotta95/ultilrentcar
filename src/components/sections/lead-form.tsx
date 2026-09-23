import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { submitLead } from "@/lib/leads.functions";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const onlyDigits = (value: string) => value.replace(/\D/g, "");
const validCpf = (value: string) => {
  const cpf = onlyDigits(value);
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += Number(cpf[i]) * (10 - i);
  let check = (sum * 10) % 11;
  if (check === 10) check = 0;
  if (check !== Number(cpf[9])) return false;
  sum = 0;
  for (let i = 0; i < 10; i++) sum += Number(cpf[i]) * (11 - i);
  check = (sum * 10) % 11;
  if (check === 10) check = 0;
  return check === Number(cpf[10]);
};
const validPhone = (value: string) => [10, 11].includes(onlyDigits(value).length);
const validCep = (value: string) => onlyDigits(value).length === 8;

const formSchema = z.object({
  full_name: z.string().trim().min(3, "Informe seu nome completo"),
  cpf: z.string().refine(validCpf, "CPF inválido"),
  birth_date: z.string().min(10, "Data inválida"),
  cellphone: z.string().refine(validPhone, "Celular inválido"),
  email: z.string().trim().email("E-mail inválido"),
  cep: z.string().refine(validCep, "CEP inválido"),
  street: z.string().min(3, "Rua obrigatória"),
  number: z.string().min(1, "Número obrigatório"),
  complement: z.string().optional(),
  neighborhood: z.string().min(2, "Bairro obrigatório"),
  city: z.string().min(2, "Cidade obrigatória"),
  state: z.string().min(2, "Estado obrigatório"),
  profession: z.string().min(2, "Profissão obrigatória"),
  platform: z.enum(["Uber", "99", "inDrive", "Outro"]),
  ref_phone_1: z.string().refine(validPhone, "Telefone de referência inválido"),
  ref_phone_2: z.string().refine(validPhone, "Telefone de referência inválido"),
  vehicle_interest: z.string().optional(),
  privacy_consent: z.boolean().refine((value) => value, {
    message: "É necessário autorizar o uso dos dados para enviar o cadastro",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const stepOneFields: Array<keyof FormValues> = [
  "full_name",
  "cpf",
  "birth_date",
  "cellphone",
  "email",
];

const stepTwoFields: Array<keyof FormValues> = [
  "cep",
  "street",
  "number",
  "neighborhood",
  "city",
  "state",
];

export function LeadForm() {
  const navigate = useNavigate();
  const submitLeadFn = useServerFn(submitLead);
  const [step, setStep] = useState(1);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      cpf: "",
      birth_date: "",
      cellphone: "",
      email: "",
      cep: "",
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "SP",
      profession: "Motorista",
      platform: "Uber",
      ref_phone_1: "",
      ref_phone_2: "",
      vehicle_interest: "",
      privacy_consent: false,
    },
  });

  async function goToStepTwo() {
    const valid = await form.trigger(stepOneFields);
    if (valid) setStep(2);
  }

  async function goToStepThree() {
    const valid = await form.trigger(stepTwoFields);
    if (valid) setStep(3);
  }

  async function onSubmit(values: FormValues) {
    try {
      await submitLeadFn({ data: values });
      toast.success("Cadastro enviado com sucesso! A equipe entrará em contato.");
      navigate({ to: "/" });
    } catch {
      toast.error("Erro ao enviar cadastro. Tente novamente.");
    }
  }

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between text-sm font-semibold text-muted-foreground">
          <span>Etapa {step} de 3</span>
          <span>{step === 1 ? "Seus dados" : step === 2 ? "Endereço" : "Perfil e interesse"}</span>
        </div>
        <div className="flex gap-2">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className={`h-2 flex-1 rounded-full transition-all duration-300 ${step >= item ? "bg-primary" : "bg-black/5"}`}
            />
          ))}
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Dados pessoais</h2>

              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome completo</FormLabel>
                    <FormControl><Input autoComplete="name" placeholder="Seu nome completo" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="cpf"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CPF</FormLabel>
                      <FormControl><Input inputMode="numeric" placeholder="000.000.000-00" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="birth_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data de nascimento</FormLabel>
                      <FormControl><Input type="date" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="cellphone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Celular / WhatsApp</FormLabel>
                      <FormControl><Input inputMode="tel" autoComplete="tel" placeholder="(00) 00000-0000" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl><Input type="email" autoComplete="email" placeholder="seu@email.com" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="button" className="w-full" onClick={() => void goToStepTwo()}>
                Continuar
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Endereço</h2>

              <FormField
                control={form.control}
                name="cep"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CEP</FormLabel>
                    <FormControl><Input inputMode="numeric" autoComplete="postal-code" placeholder="00000-000" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rua</FormLabel>
                    <FormControl><Input autoComplete="street-address" placeholder="Nome da rua" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número</FormLabel>
                      <FormControl><Input placeholder="123" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="complement"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Complemento</FormLabel>
                      <FormControl><Input placeholder="Apto, bloco, casa..." {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="neighborhood"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bairro</FormLabel>
                    <FormControl><Input placeholder="Seu bairro" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cidade</FormLabel>
                      <FormControl><Input autoComplete="address-level2" placeholder="Sua cidade" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estado</FormLabel>
                      <FormControl><Input autoComplete="address-level1" maxLength={2} placeholder="SP" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-3">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setStep(1)}>Voltar</Button>
                <Button type="button" className="flex-1" onClick={() => void goToStepThree()}>Continuar</Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold">Perfil e veículo de interesse</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  A documentação complementar, quando necessária, será solicitada pela equipe após a análise inicial.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="profession"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profissão</FormLabel>
                      <FormControl><Input placeholder="Ex: Motorista" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="platform"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Plataforma principal</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="Uber">Uber</SelectItem>
                          <SelectItem value="99">99</SelectItem>
                          <SelectItem value="inDrive">inDrive</SelectItem>
                          <SelectItem value="Outro">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="vehicle_interest"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Modelo de interesse</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value || ""}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Selecione um modelo (opcional)" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="Polo Track">Volkswagen Polo Track</SelectItem>
                        <SelectItem value="HB20 Hatch">Hyundai HB20 Hatch</SelectItem>
                        <SelectItem value="HB20 Sedan (HB20S)">Hyundai HB20 Sedan (HB20S)</SelectItem>
                        <SelectItem value="Onix Sedan (Onix Plus)">Chevrolet Onix Sedan (Onix Plus)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="ref_phone_1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone de referência 1</FormLabel>
                      <FormControl><Input inputMode="tel" placeholder="(00) 00000-0000" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ref_phone_2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone de referência 2</FormLabel>
                      <FormControl><Input inputMode="tel" placeholder="(00) 00000-0000" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="privacy_consent"
                render={({ field }) => (
                  <FormItem className="flex items-start gap-3 rounded-2xl border border-border bg-secondary/40 p-4">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1">
                      <FormLabel className="leading-relaxed">
                        Autorizo a UTIL LOCADORA a utilizar os dados informados para analisar esta solicitação e entrar em contato comigo, conforme a Política de Privacidade.
                      </FormLabel>
                      <a href="/privacidade" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-primary underline underline-offset-2">Ler Política de Privacidade</a>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <div className="flex gap-3">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setStep(2)}>Voltar</Button>
                <Button type="submit" className="flex-1" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Enviando..." : "Enviar cadastro"}
                </Button>
              </div>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}
