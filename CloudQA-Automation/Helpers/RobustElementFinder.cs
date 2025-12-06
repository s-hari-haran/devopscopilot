using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;
using SeleniumExtras.WaitHelpers;

namespace CloudQA_Automation.Helpers
{
    /// <summary>
    /// Robust element finder that tries multiple locator strategies.
    /// This ensures tests remain stable even when HTML attributes change.
    /// </summary>
    public class RobustElementFinder
    {
        private readonly IWebDriver _driver;
        private readonly WebDriverWait _wait;
        private const int DefaultTimeoutSeconds = 10;

        public RobustElementFinder(IWebDriver driver)
        {
            _driver = driver;
            _wait = new WebDriverWait(_driver, TimeSpan.FromSeconds(DefaultTimeoutSeconds));
        }

        /// <summary>
        /// Finds an element using multiple locator strategies as fallback.
        /// Tries each locator until one succeeds.
        /// </summary>
        /// <param name="locators">Array of By locators to try in order</param>
        /// <returns>Found WebElement</returns>
        /// <exception cref="NoSuchElementException">When no locator finds the element</exception>
        public IWebElement FindElement(params By[] locators)
        {
            foreach (var locator in locators)
            {
                try
                {
                    var element = _wait.Until(ExpectedConditions.ElementExists(locator));
                    if (element != null && element.Displayed)
                    {
                        Console.WriteLine($"✓ Element found using: {locator}");
                        return element;
                    }
                }
                catch (WebDriverTimeoutException)
                {
                    Console.WriteLine($"⚠ Locator failed: {locator}, trying next...");
                    continue;
                }
            }

            throw new NoSuchElementException(
                $"Element not found using any of the {locators.Length} provided locators");
        }

        /// <summary>
        /// Finds element and waits until it's clickable
        /// </summary>
        public IWebElement FindClickableElement(params By[] locators)
        {
            var element = FindElement(locators);
            _wait.Until(ExpectedConditions.ElementToBeClickable(element));
            return element;
        }

        /// <summary>
        /// Finds an element that contains specific text (resilient to text changes)
        /// </summary>
        public IWebElement FindElementByText(string partialText, params By[] fallbackLocators)
        {
            try
            {
                // Try to find by partial text first
                var xpath = $"//*[contains(text(), '{partialText}')]";
                return _wait.Until(ExpectedConditions.ElementExists(By.XPath(xpath)));
            }
            catch (WebDriverTimeoutException)
            {
                // Fall back to provided locators
                return FindElement(fallbackLocators);
            }
        }

        /// <summary>
        /// Safely enters text into an input field with retry logic
        /// </summary>
        public void SafeSendKeys(IWebElement element, string text, int maxRetries = 3)
        {
            for (int i = 0; i < maxRetries; i++)
            {
                try
                {
                    element.Clear();
                    element.SendKeys(text);
                    
                    // Verify text was entered
                    if (element.GetAttribute("value") == text)
                    {
                        Console.WriteLine($"✓ Successfully entered text: {text}");
                        return;
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Attempt {i + 1} failed: {ex.Message}");
                    if (i == maxRetries - 1) throw;
                    Thread.Sleep(500);
                }
            }
        }

        /// <summary>
        /// Waits for page to be fully loaded
        /// </summary>
        public void WaitForPageLoad()
        {
            _wait.Until(driver =>
                ((IJavaScriptExecutor)driver).ExecuteScript("return document.readyState").Equals("complete"));
        }
    }
}
