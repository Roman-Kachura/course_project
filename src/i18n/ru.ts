/* tslint:disable:no-class readonly-keyword typedef*/
import LanguageKeys from "./en";

export class LanguageKeysRu extends LanguageKeys {
    public WELCOME_HEADLINE = "Привет приложение!";
    public MENU = "МЕНЮ";
    public THEME = "ТЕМНАЯ ТЕМА";
    public REVIEWS = "ОБЗОРЫ";
    public CREATE_REVIEW = "Создать обзор";
    public MY_REVIEWS = "Мои обзоры";
    public ALL_REVIEWS = "Все обзоры";
    public OPTION = "ОПЦИИ";
    public CATEGORIES = "Категории";
    public USERS = "Пользователи";
    public SETTING = "Настройки";
    public LOGOUT = "Выйти";
    public LOGIN = "Войти";
    public SELECT_FILE = "ВЫБЕРИТЕ ФАЙЛ";
    public YOUR_RATING = "Ваша оценка:";
    public CREATE_REVIEW_TITLE_ERROR = "Заголовок должен содержать больше 0 и меньше 100 символов!";
    public CREATE_REVIEW_PRODUCT_ERROR = "Название произведения должно содержать больше 0 и меньше 100 символов!";
    public CREATE_REVIEW_DESCRIPTION_ERROR = "Описание должно содержать больше 0 и меньше 5000 символов!";
    public CREATE_REVIEW_HASHTAG_ERROR = "Хэштэг должен начинаться с # и содержать минимум 1 букву!";
    public TITLE_YOUR_REVIEW = "Заголовок для вашего обзора:";
    public PRODUCT_YOUR_REVIEW = "Название произведения:";
    public CATEGORY_YOUR_REVIEW = "Выберите категорию:";
    public HASHTAGS_YOUR_REVIEW = "Хэштэги";
    public DESCRIPTION_YOUR_REVIEW = "Описание:";
    public MAX_100 = "Максимум 100 символов";
    public MIN_1_MAX_5000 = "Минимум 1 символ\nМаксимум 5000";
    public PUBLISH = "Опубликовать";
    public EDIT_TEXT = "Редактировать";
    public SAVE_TEXT = "Сохранить";
    public RATED = "Оценок";
    public NOT_RATED = "Вы не ставили оценку этому обзору!";
    public PRODUCT_TEXT = "ПРОИЗВЕДЕНИЕ";
    public AUTHOR_TEXT = "АВТОР";
    public AUTHOR_RATING = "ОЦЕНКА АВТОРА";
    public CATEGORY_TEXT = "КАТЕГОРИЯ";
    public CREATED_TEXT = "ОПУБЛИКОВАНО";
    public DESCRIPTION_TEXT = "Описание";
    public DELETE_TEXT = "Удалить";
    public RATING = "Оценка";
    public NAME_ERROR_LENGTH = "Имя должно состоять от 3 до 20 букв!";
    public NAME_ERROR_CHARACTERS = "Имя может состоять только из символов A-Z и А-Я!";
    public NEW_NAME = "Новое имя";
    public CHANGE_TEXT = "ИЗМЕНИТЬ";
    public PASS_REQUIRED = "Поле пароля не может быть пустым!";
    public EMAIL_REQUIRED = "Поле почты не может быть пустым!";
    public NAME_REQUIRED = "Поле имени не может быть пустым!";
    public NOT_VALID_EMAIL = "Введен некорректный адрес почты";
    public PASS_TEXT = "Пароль";
    public EMAIL_TEXT = "Почта";
    public NAME_TEXT = "Имя";
    public ROLE_TEXT = "Роль";
    public USER_ROLE_TEXT = "Пользователь";
    public ADMIN_ROLE_TEXT = "Администратор";
    public CREATE_ACCOUNT_TEXT = "Создать аккаунт";
    public HAVE_ACCOUNT_TEXT = "Уже есть аккаунт?";
    public SIGN_IN_TEXT = "Войти";
    public SIGN_UP_TEXT = "Зарегистрироваться";
    public YOUR_COMMENT = "Ваш комментарий...";
    public SEND_TEXT = "Отправить";
    public CATEGORY_ERROR = "Название категории может содержать только буквы A-Z!";
    public ALL_CATEGORIES = "ВСЕ КАТЕГОРИИ";
    public NEW_CATEGORY = "Новая категория";
    public ADD_CATEGORY = "Добавить категорию";
    public SEARCH_HASHTAG_TITLE = "Искать по #хэштэгу, заголовку";
    public SEARCH_TEXT= "ПОИСК";
    public RATED_REVIEWS= "Оцененные обзоры";


    public MESSAGES = ({ count }: { count: number }) => {
        return count === 1 ? `${count} Nachricht` : `${count} Nachrichten`;
    };
}

export default LanguageKeysRu;
