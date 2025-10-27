import en from './en.json'
import ru from './ru.json'

type Messages = { [key: string]: Messages | string }

export const locales: Record<string, Messages> = { en, ru }
