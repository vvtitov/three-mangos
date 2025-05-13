import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/i18n/LanguageContext";
import { getDictionary } from "@/i18n/dictionaries";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Schema for contact form validation
const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters long" }),
});

export default function ContactFormPreview() {
  const { locale } = useLanguage();
  const dictionary = getDictionary(locale);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // En un entorno real, aquí harías una petición a tu API
      // Como estamos en Vite, simularemos un envío exitoso
      console.log('Formulario enviado:', values);

      toast("¡Tu mensaje ha sido enviado exitosamente!", {
        duration: 4000,
        description: "Tu mensaje ha sido recibido y será respondido pronto.",
      });
      form.reset();
    } catch (error) {
      console.error("Error al enviar el formulario", error);
      toast.error("No se pudo enviar tu mensaje. Por favor intenta de nuevo.", {
        duration: 4000,
        style: { backgroundColor: "#f44336", color: "#fff" },
      });
    }
  }

  return (
    <div className="flex min-h-[60vh] h-full w-full items-center justify-center px-2">
      <Card className="mx-auto max-w-md border-none">
        <CardHeader>
          <CardTitle>
            <h1 className="text-3xl text-secondary-foreground uppercase">
              {dictionary.contact.title}
            </h1>
          </CardTitle>
          <CardDescription className="text-xl text-foreground/80">
            {dictionary.contact.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-5">
                {/* Name Field */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="grid gap-2 text-foreground">
                      <FormLabel htmlFor="name">
                        {dictionary.contact.form.name}
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="name"
                          placeholder={dictionary.contact.form.placeholder.name}
                          type="text"
                          autoComplete="name"
                          className="border-secondary-foreground/50 active:bg-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="grid gap-2 text-foreground">
                      <FormLabel htmlFor="email">
                        {dictionary.contact.form.email}
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          placeholder={
                            dictionary.contact.form.placeholder.email
                          }
                          type="email"
                          autoComplete="email"
                          className="border-secondary-foreground/50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Message Field */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="grid gap-2 text-foreground max-h-[200px]">
                      <FormLabel htmlFor="message">
                        {dictionary.contact.form.message}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          id="message"
                          placeholder={
                            dictionary.contact.form.placeholder.message
                          }
                          autoComplete="off"
                          className="max-h-[150px] border-secondary-foreground/50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  variant="outline"
                  className="w-[10rem] bg-primary text-foreground rounded-full m-auto hover:bg-primary/80"
                >
                  {dictionary.contact.form.send}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
