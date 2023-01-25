export class LanguageKeys {
    public WELCOME_HEADLINE = "Welcome to the app";
    public MENU = "MENU";
    public THEME = "DARK THEME";
    public REVIEWS = "REVIEWS";
    public CREATE_REVIEW = "Create review";
    public MY_REVIEWS = "My reviews";
    public ALL_REVIEWS = "All reviews";
    public OPTION = "Options";
    public CATEGORIES = "Categories";
    public USERS = "Users";
    public SETTING = "Setting";
    public LOGOUT = "logout";
    public LOGIN = "login";
    public SELECT_FILE = "SELECT FILE";
    public YOUR_RATING = "Your rating:";
    public CREATE_REVIEW_TITLE_ERROR = "Title length must be greater than 0 and less than 100!";
    public CREATE_REVIEW_PRODUCT_ERROR = "Product length must be greater than 0 and less than 100!";
    public CREATE_REVIEW_DESCRIPTION_ERROR = "Description length must be greater than 0 and less than 5000!";
    public CREATE_REVIEW_HASHTAG_ERROR = "Hashtag must start with # and has minimum 1 character";
    public TITLE_YOUR_REVIEW = "Title for your review:";
    public PRODUCT_YOUR_REVIEW = "Product name:";
    public CATEGORY_YOUR_REVIEW = "Choose category:";
    public HASHTAGS_YOUR_REVIEW = "Hashtags";
    public DESCRIPTION_YOUR_REVIEW = "Description:";
    public MAX_100 = "Max 100 characters";
    public MIN_1_MAX_5000 = "Min 1 character\nMax 5000 characters";
    public PUBLISH = "Publish";
    public EDIT_TEXT = "Edit";
    public DELETE_TEXT = "Delete";
    public SAVE_TEXT = "Save";
    public RATED = "People rated";
    public NOT_RATED = "You didn't rate this review!";
    public PRODUCT_TEXT = "PRODUCT";
    public CATEGORY_TEXT = "CATEGORY";
    public CREATED_TEXT = "CREATED";
    public AUTHOR_TEXT = "AUTHOR";
    public AUTHOR_RATING = "AUTHOR RATING";
    public RATING = "RATING";
    public DESCRIPTION_TEXT = "Description";
    public NAME_ERROR_LENGTH = "Name must contain 3 to 20 letters!";
    public NAME_ERROR_CHARACTERS = "Name can only contain letters A-Z and А-Я!";
    public NEW_NAME = "New name";
    public CHANGE_TEXT = "CHANGE";
    public PASS_REQUIRED = "Password is required!";
    public EMAIL_REQUIRED = "Email is required!";
public NAME_REQUIRED = "Name is required!";
    public NOT_VALID_EMAIL = "Invalid email address!";
    public PASS_TEXT = "Password";
    public EMAIL_TEXT = "Email";
    public NAME_TEXT = "Name";
    public ROLE_TEXT = "Role";
    public USER_ROLE_TEXT = "USER";
    public ADMIN_ROLE_TEXT = "ADMIN";
    public CREATE_ACCOUNT_TEXT = "Create an account";
    public HAVE_ACCOUNT_TEXT = "Do you have an account?";
    public SIGN_IN_TEXT = "Sing In";
    public SIGN_UP_TEXT = "Sing Up";
    public YOUR_COMMENT = "Your comment...";
    public SEND_TEXT = "Send";
    public CATEGORY_ERROR = "Category name can contain characters from A to Z!";
    public ALL_CATEGORIES = "ALL CATEGORIES";
    public NEW_CATEGORY = "New category";
    public ADD_CATEGORY = "ADD CATEGORY";
    public SEARCH_HASHTAG_TITLE = "Search #hashtag, title";
    public SEARCH_TEXT= "SEARCH";
    public RATED_REVIEWS= "Rated reviews";

    public MESSAGES = ({ count }: { count: number }) => {
        return count === 1 ? `${count} Message` : `${count} Messages`;
    };

    public GOOD_MORNING = "Good Morning";
}

export type LangProps = keyof LanguageKeys;
export default LanguageKeys;
