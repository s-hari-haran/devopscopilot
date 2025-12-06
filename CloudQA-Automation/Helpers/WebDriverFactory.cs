using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using WebDriverManager;
using WebDriverManager.DriverConfigs.Impl;

namespace CloudQA_Automation.Helpers
{
    /// <summary>
    /// Factory class to create and configure WebDriver instances
    /// </summary>
    public static class WebDriverFactory
    {
        public static IWebDriver CreateChromeDriver(bool headless = false)
        {
            // Automatically download and setup ChromeDriver
            new DriverManager().SetUpDriver(new ChromeConfig());

            var options = new ChromeOptions();
            
            // Set binary location for containerized environments
            options.BinaryLocation = "/snap/bin/chromium";
            
            if (headless)
            {
                options.AddArgument("--headless");
            }
            
            // Common options for stability
            options.AddArgument("--no-sandbox");
            options.AddArgument("--disable-dev-shm-usage");
            options.AddArgument("--disable-gpu");
            options.AddArgument("--window-size=1920,1080");
            options.AddArgument("--disable-blink-features=AutomationControlled");
            options.AddArgument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36");

            var driver = new ChromeDriver(options);
            driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(10);
            driver.Manage().Timeouts().PageLoad = TimeSpan.FromSeconds(30);
            
            return driver;
        }
    }
}
