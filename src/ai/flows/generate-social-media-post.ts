'use server';

/**
 * @fileOverview Agen AI untuk membuat postingan media sosial.
 *
 * - generateSocialMediaPost - Fungsi yang menangani proses pembuatan postingan.
 * - GenerateSocialMediaPostInput - Tipe input untuk fungsi.
 * - GenerateSocialMediaPostOutput - Tipe return untuk fungsi.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateSocialMediaPostInputSchema = z.object({
  productName: z.string().describe('Nama produk.'),
  productCategory: z.string().describe('Kategori produk.'),
  description: z.string().describe('Deskripsi produk.'),
});
export type GenerateSocialMediaPostInput = z.infer<typeof GenerateSocialMediaPostInputSchema>;

const GenerateSocialMediaPostOutputSchema = z.object({
  post: z.string().describe('Konten postingan media sosial yang dihasilkan oleh AI.'),
});
export type GenerateSocialMediaPostOutput = z.infer<typeof GenerateSocialMediaPostOutputSchema>;

export async function generateSocialMediaPost(input: GenerateSocialMediaPostInput): Promise<GenerateSocialMediaPostOutput> {
  return generateSocialMediaPostFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSocialMediaPostPrompt',
  input: { schema: GenerateSocialMediaPostInputSchema },
  output: { schema: GenerateSocialMediaPostOutputSchema },
  prompt: `Anda adalah seorang manajer media sosial yang ahli dalam membuat konten yang menarik untuk merek gaya hidup dan F&B.
Tugas Anda adalah membuat postingan media sosial singkat dan menarik berdasarkan detail produk yang diberikan.

Gunakan nada yang santai, ramah, dan mengajak. Sertakan emoji yang relevan dan beberapa tagar populer.
Fokus untuk menyoroti keunikan produk.

Detail Produk:
Nama Produk: {{{productName}}}
Kategori: {{{productCategory}}}
Deskripsi: {{{description}}}

Buat postingan media sosial sekarang.
`,
});

const generateSocialMediaPostFlow = ai.defineFlow(
  {
    name: 'generateSocialMediaPostFlow',
    inputSchema: GenerateSocialMediaPostInputSchema,
    outputSchema: GenerateSocialMediaPostOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
