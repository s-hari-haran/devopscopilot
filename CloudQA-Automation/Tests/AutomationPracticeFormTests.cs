using NUnit.Framework;
using OpenQA.Selenium;
using CloudQA_Automation.Helpers;
using CloudQA_Automation.PageObjects;

namespace CloudQA_Automation.Tests
{
    /// <summary>
    /// Automated tests for CloudQA Practice Form
    /// Tests are designed to be resilient to HTML changes using multiple locator strategies
    /// </summary>
    [TestFixture]
    public class AutomationPracticeFormTests
    {
        private IWebDriver? _driver;
        private AutomationPracticeFormPage? _formPage;

        [SetUp]
        public void Setup()
        {
            Console.WriteLine("Setting up test environment...");
            _driver = WebDriverFactory.CreateChromeDriver(headless: true);
            _formPage = new AutomationPracticeFormPage(_driver);
            _formPage.NavigateToPage();
            Console.WriteLine("✓ Test setup complete\n");
        }

        [TearDown]
        public void TearDown()
        {
            Console.WriteLine("\nCleaning up...");
            _driver?.Quit();
            _driver?.Dispose();
            Console.WriteLine("✓ Test cleanup complete");
        }

        #region Test 1: First Name Field
        [Test]
        [Category("Smoke")]
        [Description("Validates that the First Name field can be located and accepts text input")]
        public void Test01_FirstNameField_ShouldAcceptInput()
        {
            // Arrange
            const string testFirstName = "John";
            Console.WriteLine($"Test: Entering first name '{testFirstName}'");

            // Act
            _formPage!.EnterFirstName(testFirstName);
            var actualValue = _formPage.GetFirstNameValue();

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(actualValue, Is.EqualTo(testFirstName), 
                    "First name field should contain the entered value");
                Assert.That(actualValue, Is.Not.Empty, 
                    "First name field should not be empty after input");
            });

            Console.WriteLine($"✓ First name field successfully accepted: {actualValue}");
        }

        [Test]
        [Category("Functional")]
        [Description("Validates First Name field with various input scenarios")]
        [TestCase("Alice", Description = "Simple name")]
        [TestCase("Mary-Jane", Description = "Hyphenated name")]
        [TestCase("O'Connor", Description = "Name with apostrophe")]
        [TestCase("José", Description = "Name with accent")]
        public void Test02_FirstNameField_ShouldHandleVariousInputs(string firstName)
        {
            // Arrange
            Console.WriteLine($"Test: Entering first name '{firstName}'");

            // Act
            _formPage!.EnterFirstName(firstName);
            var actualValue = _formPage.GetFirstNameValue();

            // Assert
            Assert.That(actualValue, Is.EqualTo(firstName),
                $"First name field should accept and retain '{firstName}'");

            Console.WriteLine($"✓ Successfully validated input: {actualValue}");
        }
        #endregion

        #region Test 2: Email Field
        [Test]
        [Category("Smoke")]
        [Description("Validates that the Email field can be located and accepts valid email input")]
        public void Test03_EmailField_ShouldAcceptValidEmail()
        {
            // Arrange
            const string testEmail = "john.doe@example.com";
            Console.WriteLine($"Test: Entering email '{testEmail}'");

            // Act
            _formPage!.EnterEmail(testEmail);
            var actualValue = _formPage.GetEmailValue();

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(actualValue, Is.EqualTo(testEmail),
                    "Email field should contain the entered email");
                Assert.That(actualValue, Does.Contain("@"),
                    "Email field should contain @ symbol");
                Assert.That(actualValue, Does.Match(@"^[\w\.-]+@[\w\.-]+\.\w+$"),
                    "Email field should contain a valid email format");
            });

            Console.WriteLine($"✓ Email field successfully accepted: {actualValue}");
        }

        [Test]
        [Category("Functional")]
        [Description("Validates Email field with various valid email formats")]
        [TestCase("user@domain.com", Description = "Standard email")]
        [TestCase("first.last@company.co.uk", Description = "Email with dots and multiple TLDs")]
        [TestCase("user+tag@example.org", Description = "Email with plus sign")]
        [TestCase("test_user123@test-domain.net", Description = "Email with underscore and hyphen")]
        public void Test04_EmailField_ShouldHandleVariousEmailFormats(string email)
        {
            // Arrange
            Console.WriteLine($"Test: Entering email '{email}'");

            // Act
            _formPage!.EnterEmail(email);
            var actualValue = _formPage.GetEmailValue();

            // Assert
            Assert.That(actualValue, Is.EqualTo(email),
                $"Email field should accept and retain '{email}'");

            Console.WriteLine($"✓ Successfully validated email: {actualValue}");
        }
        #endregion

        #region Test 3: Gender Radio Button
        [Test]
        [Category("Smoke")]
        [Description("Validates that the Male gender radio button can be located and selected")]
        public void Test05_GenderRadioButton_ShouldBeSelectable()
        {
            // Arrange
            Console.WriteLine("Test: Selecting Male gender radio button");

            // Act
            _formPage!.SelectMaleGender();
            var isSelected = _formPage.IsMaleGenderSelected();

            // Assert
            Assert.That(isSelected, Is.True,
                "Male gender radio button should be selected after clicking");

            Console.WriteLine("✓ Male gender radio button successfully selected");
        }

        [Test]
        [Category("Functional")]
        [Description("Validates that gender selection persists after form interaction")]
        public void Test06_GenderRadioButton_ShouldPersistSelection()
        {
            // Arrange
            Console.WriteLine("Test: Validating gender selection persistence");

            // Act - Select gender first
            _formPage!.SelectMaleGender();
            var initialSelection = _formPage.IsMaleGenderSelected();

            // Interact with other fields
            _formPage.EnterFirstName("TestUser");
            _formPage.EnterEmail("test@example.com");

            // Check if selection persisted
            var finalSelection = _formPage.IsMaleGenderSelected();

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(initialSelection, Is.True,
                    "Gender should be selected initially");
                Assert.That(finalSelection, Is.True,
                    "Gender selection should persist after interacting with other fields");
            });

            Console.WriteLine("✓ Gender selection persisted successfully");
        }
        #endregion

        #region Integration Test
        [Test]
        [Category("Integration")]
        [Description("Validates that all three fields work together correctly")]
        public void Test07_AllFields_ShouldWorkTogether()
        {
            // Arrange
            const string firstName = "Jane";
            const string email = "jane.smith@test.com";
            Console.WriteLine("Test: Filling all three fields together");

            // Act
            _formPage!.EnterFirstName(firstName);
            _formPage.EnterEmail(email);
            _formPage.SelectMaleGender();

            // Retrieve values
            var actualFirstName = _formPage.GetFirstNameValue();
            var actualEmail = _formPage.GetEmailValue();
            var isGenderSelected = _formPage.IsMaleGenderSelected();

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(actualFirstName, Is.EqualTo(firstName),
                    "First name should be preserved");
                Assert.That(actualEmail, Is.EqualTo(email),
                    "Email should be preserved");
                Assert.That(isGenderSelected, Is.True,
                    "Gender selection should be preserved");
            });

            Console.WriteLine($"✓ All fields validated successfully:");
            Console.WriteLine($"  - First Name: {actualFirstName}");
            Console.WriteLine($"  - Email: {actualEmail}");
            Console.WriteLine($"  - Gender: Male (Selected: {isGenderSelected})");
        }
        #endregion

        #region Resilience Test
        [Test]
        [Category("Resilience")]
        [Description("Validates that tests can recover from page reloads")]
        public void Test08_Fields_ShouldBeLocatableAfterPageReload()
        {
            // Arrange
            Console.WriteLine("Test: Validating element location after page reload");

            // Act - First interaction
            _formPage!.EnterFirstName("Test1");
            
            // Reload page
            Console.WriteLine("Reloading page...");
            _formPage.NavigateToPage();
            
            // Second interaction after reload
            _formPage.EnterFirstName("Test2");
            _formPage.EnterEmail("test@reload.com");
            _formPage.SelectMaleGender();

            var firstName = _formPage.GetFirstNameValue();
            var email = _formPage.GetEmailValue();
            var isGenderSelected = _formPage.IsMaleGenderSelected();

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(firstName, Is.EqualTo("Test2"),
                    "Fields should be locatable and functional after reload");
                Assert.That(email, Is.Not.Empty,
                    "Email field should be functional after reload");
                Assert.That(isGenderSelected, Is.True,
                    "Radio button should be functional after reload");
            });

            Console.WriteLine("✓ All elements successfully located and functional after page reload");
        }
        #endregion
    }
}
