export type Minifig = {
  last_modified_dt: string;
  name: string;
  num_parts: number;
  set_img_url: string;
  set_num: string;
  set_url: string;
};

export type Part = {
  element_id: string;
  id: number;
  inv_part_id: string;
  part: {
    name: string;
    part_cat_id?: string;
    part_img_url: string;
    part_num: string;
  };
};

export type MinifigsResponse<T extends Minifig | Part> = {
  count: number;
  next: string;
  previous: string | null;
  results: T[];
};
