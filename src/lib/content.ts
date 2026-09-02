import { weddingContent } from "@/content/wedding";
import type { WeddingContent } from "@/lib/types";

/**
 * Content access layer.
 *
 * Today everything resolves from the typed mock in `src/content/wedding.ts`.
 * To move the couple onto Supabase, implement `supabaseContentProvider` with
 * the same shape and flip `NEXT_PUBLIC_CONTENT_SOURCE=supabase`. No component
 * imports the mock directly, so nothing else has to change.
 */
export interface ContentProvider {
  getWeddingContent(): Promise<WeddingContent>;
}

const mockContentProvider: ContentProvider = {
  async getWeddingContent() {
    return weddingContent;
  },
};

// const supabaseContentProvider: ContentProvider = {
//   async getWeddingContent() {
//     const supabase = createServerClient();
//     const [couple, meta, events, story /* ... */] = await Promise.all([...]);
//     return mapRowsToWeddingContent({ couple, meta, events, story });
//   },
// };

function resolveProvider(): ContentProvider {
  switch (process.env.NEXT_PUBLIC_CONTENT_SOURCE) {
    // case "supabase":
    //   return supabaseContentProvider;
    default:
      return mockContentProvider;
  }
}

export const contentProvider = resolveProvider();

export function getWeddingContent(): Promise<WeddingContent> {
  return contentProvider.getWeddingContent();
}
