export type articleProps = {
	title?: string;
	description?: string;
	url?: string;
    author?: string;
	urlToImage?: string | null;
};

export interface Category {
	name: string;
	text: string;
}