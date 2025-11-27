// @ts-nocheck
'use server';

/**
 * @fileOverview Deskripsi produk otomatis AI agent.
 *
 * - generateProductDescription - Fungsi yang menangani proses pembuatan deskripsi produk.
 * - GenerateProductDescriptionInput - Tipe input untuk fungsi generateProductDescription.
 * - GenerateProductDescriptionOutput - Tipe return untuk fungsi generateProductDescription.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateProductDescriptionInputSchema = z.object({
  productName: z.string().describe('Nama produk.'),
  productCategory: z.string().describe('Kategori produk.'),
  productFeatures: z.string().describe('Fitur-fitur utama produk (pisahkan dengan koma).'),
});
export type GenerateProductDescriptionInput = z.infer<typeof GenerateProductDescriptionInputSchema>;

const GenerateProductDescriptionOutputSchema = z.object({
  description: z.string().describe('Deskripsi produk yang dihasilkan oleh AI.'),
});
export type GenerateProductDescriptionOutput = z.infer<typeof GenerateProductDescriptionOutputSchema>;

export async function generateProductDescription(input: GenerateProductDescriptionInput): Promise<GenerateProductDescriptionOutput> {
  return generateProductDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProductDescriptionPrompt',
  input: { schema: GenerateProductDescriptionInputSchema },
  output: { schema: GenerateProductDescriptionOutputSchema },
  prompt: `Anda adalah seorang pemasar ahli yang bertugas membuat deskripsi produk yang menarik dan informatif.

Buatlah deskripsi produk berdasarkan informasi berikut:

Nama Produk: {{{productName}}}
Kategori Produk: {{{productCategory}}}
Fitur Utama: {{{productFeatures}}}

Deskripsi:
`,
});

const generateProductDescriptionFlow = ai.defineFlow(
  {
    name: 'generateProductDescriptionFlow',
    inputSchema: GenerateProductDescriptionInputSchema,
    outputSchema: GenerateProductDescriptionOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
