"use client";

import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { toast } from "sonner";
import { CheckIcon, PlusIcon } from "lucide-react";
import { getGreeting, cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function Home() {
  const articles = useQuery(api.articles.getArticles);

  const [formOpen, setFormOpen] = useState(false);

  return (
    <>
      <section className="h-screen flex flex-col gap-6">
        <h2>{getGreeting()} Dude!</h2>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>
              Articles
              <Badge
                variant={"secondary"}
                className="w-fit aspect-square text-xs p-1 ml-2 mb-2"
              >
                {articles?.length}
              </Badge>
            </CardTitle>

            <CardAction>
              <NewArticle setOpen={setFormOpen} open={formOpen} />
            </CardAction>
          </CardHeader>

          <Separator />

          <CardContent>
            {articles === undefined ? (
              <div className="w-full flex items-center gap-2 justify-center">
                <Spinner />
                <p>Getting Articles</p>
              </div>
            ) : articles.length <= 0 ? (
              <>
                <div className="w-full flex items-center justify-center gap-4">
                  <p>There are no articles.</p>
                </div>
              </>
            ) : (
              <>
                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
                  {articles.map((a) => (
                    <Link
                      key={a._id}
                      href={`/edit/${a._id}`}
                      className="w-full flex flex-col gap-4 p-6 bg-background rounded-xl border-2 hover:border:foreground transition-all group"
                    >
                      <h4 className="group-hover:underline">{a.title}</h4>
                      <p className="text-muted-foreground !text-sm">{a.overview}</p>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </section>
    </>
  );
}

const formSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Article title needs to be 3 characters or more." }),
  overview: z.string().min(3, {
    message: "Please provide an overview 3 or more characters in length.",
  }),
});
type FormType = z.infer<typeof formSchema>;

function NewArticle({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (o: boolean) => void;
}) {
  const createArticle = useMutation(api.articles.createArticle);
  const router = useRouter();

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      overview: "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = form;

  async function onSubmit(values: FormType) {
    try {
      const { newArticle: articleId } = await createArticle({
        overview: values.overview,
        title: values.title,
      });
      toast.success("Article Created Successfully!");
      reset();
      setOpen(false);
      router.push(`/edit/${articleId}`);
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong, please try again.");
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={() => setOpen(!open)}>
        <DialogTrigger asChild>
          <Button>
            <PlusIcon />
            New Article
          </Button>
        </DialogTrigger>

        <DialogContent className="min-w-xl">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <DialogHeader>
                <DialogTitle>New Article</DialogTitle>
                <DialogDescription>
                  One small step for man ...
                </DialogDescription>
              </DialogHeader>

              <Separator className="my-8" />

              <div className="w-full flex flex-col gap-6">
                <FormField
                  control={control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="overview"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Overview</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator className="my-8" />

              <DialogFooter className="flex !justify-between">
                <DialogClose asChild>
                  <Button type="button" variant={"outline"}>
                    Cancel
                  </Button>
                </DialogClose>

                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Spinner />
                      Creating
                    </>
                  ) : (
                    <>
                      <CheckIcon />
                      Create
                    </>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
