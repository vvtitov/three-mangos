import { es } from './dictionaries/es';
import { en } from './dictionaries/en';

const dictionaries = {
    en,
    es,
};

export const getDictionary = (locale: 'en' | 'es') => dictionaries[locale]; 