export interface Book {
  title: string;
  author_name: string[];
  cover_i: number;
  first_publish_year: number;
  publisher: string[];
  language: string[];
  number_of_pages: number;
  description?: string;
  key: string;
  subjects?: string[];
  subject_places?: string[];
  created?: {
    type: string;
    value: string;
  };
  last_modified?: {
    type: string;
    value: string;
  };
}
