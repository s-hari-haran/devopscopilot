using OpenQA.Selenium;
using CloudQA_Automation.Helpers;

namespace CloudQA_Automation.PageObjects
{
    /// <summary>
    /// Page Object Model for CloudQA Automation Practice Form
    /// Uses multiple locator strategies for resilience
    /// </summary>
    public class AutomationPracticeFormPage
    {
        private readonly IWebDriver _driver;
        private readonly RobustElementFinder _finder;
        private const string PageUrl = "https://app.cloudqa.io/home/AutomationPracticeForm";

        public AutomationPracticeFormPage(IWebDriver driver)
        {
            _driver = driver;
            _finder = new RobustElementFinder(driver);
        }

        public void NavigateToPage()
        {
            _driver.Navigate().GoToUrl(PageUrl);
            _finder.WaitForPageLoad();
        }

        #region Field 1: First Name Input
        /// <summary>
        /// Locates the First Name field using multiple strategies:
        /// 1. By ID (most stable)
        /// 2. By Name attribute
        /// 3. By Placeholder text
        /// 4. By XPath with label relationship
        /// 5. By CSS Selector with input type
        /// </summary>
        public IWebElement FirstNameField => _finder.FindElement(
            By.Id("fname"),
            By.Name("fname"),
            By.XPath("//input[@placeholder='First Name']"),
            By.XPath("//label[contains(text(),'First Name')]/following-sibling::input"),
            By.CssSelector("input[type='text'][placeholder*='First']"),
            By.XPath("//input[contains(@class,'form-control') and contains(@placeholder,'First')]")
        );

        public void EnterFirstName(string firstName)
        {
            var field = FirstNameField;
            _finder.SafeSendKeys(field, firstName);
        }

        public string GetFirstNameValue()
        {
            return FirstNameField.GetAttribute("value");
        }
        #endregion

        #region Field 2: Email Input
        /// <summary>
        /// Locates the Email field using multiple strategies:
        /// 1. By ID
        /// 2. By Name attribute
        /// 3. By input type='email'
        /// 4. By Placeholder text
        /// 5. By XPath with label relationship
        /// </summary>
        public IWebElement EmailField => _finder.FindElement(
            By.Id("email"),
            By.Name("email"),
            By.CssSelector("input[type='email']"),
            By.XPath("//input[@placeholder='Email']"),
            By.XPath("//label[contains(text(),'Email')]/following-sibling::input"),
            By.XPath("//input[contains(@placeholder,'Email') or contains(@name,'email')]")
        );

        public void EnterEmail(string email)
        {
            var field = EmailField;
            _finder.SafeSendKeys(field, email);
        }

        public string GetEmailValue()
        {
            return EmailField.GetAttribute("value");
        }
        #endregion

        #region Field 3: Gender Radio Button (Male)
        /// <summary>
        /// Locates the Male Gender radio button using multiple strategies:
        /// 1. By ID
        /// 2. By Value attribute
        /// 3. By XPath with label text
        /// 4. By CSS with value
        /// 5. By XPath with type and value
        /// </summary>
        public IWebElement GenderMaleRadioButton => _finder.FindClickableElement(
            By.Id("male"),
            By.CssSelector("input[value='male'][type='radio']"),
            By.XPath("//label[contains(text(),'Male')]/preceding-sibling::input[@type='radio']"),
            By.XPath("//input[@type='radio' and @value='male']"),
            By.XPath("//label[text()='Male']/../input[@type='radio']"),
            By.CssSelector("input[type='radio'][name*='gender'][value='male']")
        );

        public void SelectMaleGender()
        {
            var radioButton = GenderMaleRadioButton;
            if (!radioButton.Selected)
            {
                radioButton.Click();
                Console.WriteLine("✓ Selected Male gender");
            }
        }

        public bool IsMaleGenderSelected()
        {
            return GenderMaleRadioButton.Selected;
        }
        #endregion

        #region Additional Helper Methods
        public bool IsPageLoaded()
        {
            try
            {
                return _driver.Url.Contains("AutomationPracticeForm") &&
                       _driver.Title.Length > 0;
            }
            catch
            {
                return false;
            }
        }

        public void WaitForFieldsToLoad()
        {
            // Ensure all three fields are present
            _ = FirstNameField;
            _ = EmailField;
            _ = GenderMaleRadioButton;
            Console.WriteLine("✓ All form fields loaded successfully");
        }
        #endregion
    }
}
