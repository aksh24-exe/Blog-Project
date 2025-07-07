"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { slugify } from "@/lib/utils";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { _success } from "zod/v4/core";

export async function createPost(formData: FormData) {
  try {
    // get current user
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session?.user) {
      return {
        success: false,
        message: "You must be logged in to create a post",
      };
    }

    // get form data
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const content = formData.get("content") as string;

    // Validation check

    // create the slug from the post title
    const slug = slugify(title);

    //check if the slug already exists
    const existingPost = await db.query.posts.findFirst({
      where: eq(posts.slug, slug),
    });

    if (existingPost) {
      return {
        success: false,
        message:
          "A post with the same title already exists! Please try with New title ",
      };
    }

    const [newPost] = await db
      .insert(posts)
      .values({
        title,
        description,
        content,
        slug,
        authorId: session.user.id,
      })
      .returning();

    // revalidate the homepage to get the latest posts
    revalidatePath("/");
    revalidatePath("/post/${slug");
    revalidatePath("/profile");

    return {
      success: true,
      message: "Post create successfully",
      slug,
    };
  } catch (error) {
    return {
      success: true,
      message: "Failed to create new Post",
    };
  }
}
