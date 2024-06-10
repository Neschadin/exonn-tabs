export const removeItem = (source: TTabItem[], id: string) =>
  source.filter((tab) => tab.id !== id);

export const findItem = (source: TTabItem[], id: string) =>
  source.find((tab) => tab.id === id);
