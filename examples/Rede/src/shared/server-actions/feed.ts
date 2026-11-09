"server";

import type { Post } from "../types";

export interface CreatePostInput {
    body: string;
    author?: string;
    handle?: string;
    avatar?: string;
}

const currentUser = {
    name: "Johnathan",
    handle: "@johnathan",
    avatar: "J",
};

const initialServerPosts: Post[] = [
    {
        id: 1,
        author: "Maya Costa",
        handle: "@maya",
        time: "12 min",
        body: "Primeiro build da Rede no AdaptiveJS. Front hoje, microsservicos em Rust depois. Saudades de escrever no mural.",
        replies: 18,
        reposts: 42,
        likes: 190,
        avatar: "MC",
    },
    {
        id: 2,
        author: "Joao Nunes",
        handle: "@joao.dev",
        time: "27 min",
        body: "Timeline minima, composer local e layout com um pouco daquela vibe de Orkut: mural, comunidades e perfil mais humano.",
        replies: 9,
        reposts: 17,
        likes: 88,
        avatar: "JN",
    },
    {
        id: 3,
        author: "Lia Ramos",
        handle: "@liaux",
        time: "1 h",
        body: "Gostei da estrutura: pages para rotas, features para produto e shared para contratos. Ja imagino os depoimentos voltando.",
        replies: 6,
        reposts: 21,
        likes: 134,
        avatar: "LR",
    },
];

let postsStore: Post[] = [...initialServerPosts];

export async function getPosts(): Promise<Post[]> {
    return postsStore;
}

export async function createPost(input: CreatePostInput): Promise<Post> {
    const body = input.body?.trim();
    if (!body) {
        throw new Error("O conteudo do post nao pode ser vazio.");
    }

    const newPost: Post = {
        id: Date.now(),
        author: input.author || currentUser.name,
        handle: input.handle || currentUser.handle,
        avatar: input.avatar || currentUser.avatar,
        time: "agora",
        body,
        replies: 0,
        reposts: 0,
        likes: 0,
    };

    postsStore = [newPost, ...postsStore];
    return newPost;
}

export async function likePost(id: number): Promise<{ id: number; likes: number }> {
    const post = postsStore.find((item) => item.id === id);
    if (!post) {
        throw new Error(`Post com id ${id} nao foi encontrado.`);
    }

    post.likes += 1;
    return { id: post.id, likes: post.likes };
}

export async function repostPost(id: number): Promise<{ id: number; reposts: number }> {
    const post = postsStore.find((item) => item.id === id);
    if (!post) {
        throw new Error(`Post com id ${id} nao foi encontrado.`);
    }

    post.reposts += 1;
    return { id: post.id, reposts: post.reposts };
}

export async function deletePost(id: number): Promise<{ success: boolean; id: number }> {
    const initialLength = postsStore.length;
    postsStore = postsStore.filter((post) => post.id !== id);
    return { success: postsStore.length < initialLength, id };
}

export async function resetPosts(): Promise<Post[]> {
    postsStore = [...initialServerPosts];
    return postsStore;
}
