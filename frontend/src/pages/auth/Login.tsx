import authImg from "../../assets/auth.png";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters long."),
});

type LoginValues = z.infer<typeof loginSchema>;

const Login = () => {
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginValues) => {
    console.log(values);
  };
  return (
    <div className="flex md:flex-row flex-col items-center justify-center gap-2 w-full min-h-screen">
      <div className="flex flex-col gap-3 md:w-1/2 items-center justify-center">
        <div className="flex flex-col gap-4 items-start justify-center w-[80%] p-2">
          <div>
            <img src="" alt="" />
            <h3 className="text-primary font-bold text-3xl">EdPlus</h3>
          </div>
          <h1 className="text-6xl text-foreground font-bold w-full">
            The Clarified Canvas for Schools.
          </h1>
          <p className="text-muted-foreground leading-7 w-full">
            Transforming institutional administration into a curated,
            light-filled experience. Manage and grow your academic community
            with clinical precision and editorial clarity.
          </p>
          <div className="flex flex-col items-center justify-center relative w-full">
            <img
              src={authImg}
              className="w-full rounded-xl max-h-[300px] md:max-h-[360px] object-cover"
              alt="Students collaborating in a school setting"
            />
            <p className="text-muted-foreground leading-7 bg-background absolute bottom-3 w-full p-3 rounded-lg">
              “Focus is not about doing more; it’s about removing what is not
              essential.”
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 md:w-1/2 items-center justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-full max-w-sm bg-card rounded-lg p-4"
          >
            <h3 className=" text-foreground font-bold text-3xl">
              Welcome Back
            </h3>
            <p className="text-muted-foreground font-bold">Enter your credentials to access the atelier.</p>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
