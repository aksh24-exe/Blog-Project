import { auth } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";
import { getPostBySlug } from "@/lib/db/query";
import { Container } from "lucide-react";
import PostForm from "@/components/post/post-form";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    redirect("/");
  }

  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  if (post.authorId !== session.user.id) {
    redirect("/");
  }

  return (
    <Container>
      <h1 className="max-w-2xl font-bold mb-6">Edit Post</h1>
      <PostForm
        isEditing={true}
        post={{ id: post.id, title: post.title, description: post.description, content: post.content, slug: post.slug }}
      />
    </Container>
  );
}
