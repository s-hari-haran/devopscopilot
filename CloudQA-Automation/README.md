# CloudQA Automation Practice Form - Selenium C# Tests

Automated test suite for CloudQA's Automation Practice Form using C#, Selenium WebDriver, and NUnit with robust locator strategies.

## 🎯 Project Overview

This project demonstrates **resilient test automation** that remains stable even when:
- Element positions change
- HTML attributes are modified
- Page structure is updated
- CSS classes are renamed

## 🏗️ Architecture

### **Design Patterns Used:**
1. **Page Object Model (POM)** - Encapsulates page elements and actions
2. **Multiple Locator Strategy** - Each element has 4-6 fallback locators
3. **Factory Pattern** - WebDriver creation and configuration
4. **Helper Pattern** - Reusable utility methods

### **Project Structure:**
```
CloudQA-Automation/
├── Helpers/
│   ├── RobustElementFinder.cs    # Multi-strategy element location
│   └── WebDriverFactory.cs        # WebDriver creation
├── PageObjects/
│   └── AutomationPracticeFormPage.cs  # Page Object Model
├── Tests/
│   └── AutomationPracticeFormTests.cs # Test cases
└── CloudQA-Automation.csproj      # Project configuration
```

## 🧪 Test Coverage

### **Three Fields Tested:**

#### 1️⃣ **First Name Field**
- **Locator Strategies (6 fallbacks):**
  - By ID: `fname`
  - By Name attribute: `fname`
  - By Placeholder: `"First Name"`
  - By Label relationship (XPath)
  - By CSS with input type
  - By combined class and placeholder

- **Tests:**
  - ✅ Basic input acceptance
  - ✅ Various name formats (hyphenated, apostrophe, accents)

#### 2️⃣ **Email Field**
- **Locator Strategies (6 fallbacks):**
  - By ID: `email`
  - By Name attribute: `email`
  - By input type: `type='email'`
  - By Placeholder: `"Email"`
  - By Label relationship (XPath)
  - By combined attributes

- **Tests:**
  - ✅ Valid email acceptance
  - ✅ Various email formats (dots, plus signs, hyphens)
  - ✅ Email format validation

#### 3️⃣ **Gender Radio Button (Male)**
- **Locator Strategies (6 fallbacks):**
  - By ID: `male`
  - By Value: `value='male'`
  - By Label text relationship (XPath)
  - By CSS with type and value
  - By parent-child relationship
  - By combined name and value

- **Tests:**
  - ✅ Selection functionality
  - ✅ Selection persistence
  - ✅ State validation

## 🚀 Getting Started

### **Prerequisites:**
- .NET 8.0 SDK
- Google Chrome browser

### **Installation:**

1. **Navigate to project directory:**
```bash
cd CloudQA-Automation
```

2. **Restore NuGet packages:**
```bash
dotnet restore
```

3. **Build the project:**
```bash
dotnet build
```

## ▶️ Running Tests

### **Run all tests:**
```bash
dotnet test
```

### **Run specific test categories:**
```bash
# Smoke tests only
dotnet test --filter "Category=Smoke"

# Functional tests only
dotnet test --filter "Category=Functional"

# Integration tests
dotnet test --filter "Category=Integration"

# Resilience tests
dotnet test --filter "Category=Resilience"
```

### **Run specific test:**
```bash
dotnet test --filter "FullyQualifiedName~Test01_FirstNameField_ShouldAcceptInput"
```

### **Run with detailed output:**
```bash
dotnet test -v detailed
```

### **Generate test report:**
```bash
dotnet test --logger "html;logfilename=test-results.html"
```

## 🛡️ Resilience Features

### **1. Multiple Locator Strategy**
Each element uses 4-6 different locator strategies:
```csharp
public IWebElement FirstNameField => _finder.FindElement(
    By.Id("fname"),                    // Primary
    By.Name("fname"),                  // Backup 1
    By.XPath("//input[@placeholder='First Name']"),  // Backup 2
    By.XPath("//label[contains(text(),'First Name')]/following-sibling::input"),  // Backup 3
    By.CssSelector("input[type='text'][placeholder*='First']"),  // Backup 4
    By.XPath("//input[contains(@class,'form-control')]")  // Backup 5
);
```

### **2. Smart Retry Logic**
```csharp
public void SafeSendKeys(IWebElement element, string text, int maxRetries = 3)
{
    // Automatically retries on failure
    // Verifies input was successful
    // Handles stale element exceptions
}
```

### **3. Explicit Waits**
```csharp
// Waits for element to be present AND visible
// Waits for element to be clickable
// Waits for page load completion
```

## 📊 Test Results

All tests include:
- ✅ Detailed console logging
- ✅ Multiple assertions per test
- ✅ Clear pass/fail indicators
- ✅ Descriptive test names and categories

**Example output:**
```
Setting up test environment...
✓ Test setup complete

Test: Entering first name 'John'
✓ Element found using: By.Id: fname
✓ Successfully entered text: John
✓ First name field successfully accepted: John

✓ Test cleanup complete
```

## 🔧 Configuration

### **WebDriver Options:**
```csharp
// Headless mode for CI/CD
var driver = WebDriverFactory.CreateChromeDriver(headless: true);

// Headful mode for debugging
var driver = WebDriverFactory.CreateChromeDriver(headless: false);
```

### **Timeouts:**
- Implicit wait: 10 seconds
- Page load timeout: 30 seconds
- Element wait: 10 seconds

## 📚 Key Technologies

- **Framework:** .NET 8.0
- **Test Framework:** NUnit 4.0
- **Selenium:** WebDriver 4.16.2
- **WebDriver Management:** WebDriverManager 2.17.2
- **Browser:** Chrome (auto-downloaded)

## 🎨 Best Practices Implemented

1. ✅ **Page Object Model** - Clean separation of test logic and page structure
2. ✅ **DRY Principle** - Reusable helper methods
3. ✅ **Single Responsibility** - Each class has one clear purpose
4. ✅ **Explicit Waits** - No Thread.Sleep, all waits are intelligent
5. ✅ **Descriptive Naming** - Clear test and method names
6. ✅ **Test Categories** - Organized for easy filtering
7. ✅ **Proper Cleanup** - Guaranteed driver disposal
8. ✅ **Comprehensive Assertions** - Multiple validations per test

## 🐛 Troubleshooting

### **ChromeDriver Issues:**
```bash
# WebDriverManager automatically downloads the correct version
# If issues persist, manually download from:
# https://chromedriver.chromium.org/downloads
```

### **Element Not Found:**
- Check console logs to see which locator strategies were attempted
- Tests will try all 6 locators before failing
- Add more locator strategies if needed

### **Tests Running Slowly:**
- Reduce wait timeouts in `RobustElementFinder`
- Use headless mode: `CreateChromeDriver(headless: true)`

## 📈 Extending Tests

### **Add new field test:**
1. Add locator strategies in `AutomationPracticeFormPage.cs`
2. Create test methods in `AutomationPracticeFormTests.cs`
3. Follow the existing pattern with multiple assertions

### **Add new page:**
1. Create new page object in `PageObjects/`
2. Use `RobustElementFinder` for all element location
3. Create corresponding test class in `Tests/`

## ✅ Why This Approach?

**Traditional Test (Brittle):**
```csharp
var element = driver.FindElement(By.Id("fname"));  // Breaks if ID changes
```

**Our Approach (Resilient):**
```csharp
var element = _finder.FindElement(
    By.Id("fname"),           // Try ID first
    By.Name("fname"),         // Fall back to name
    By.XPath("//input[...]"), // Try XPath
    // ... 3 more strategies
);  // Works even if ID, name, or position changes
```

## 🎯 Test Execution Time

- **Single test:** ~3-5 seconds
- **Full suite (8 tests):** ~30-40 seconds
- **Headless mode:** ~25% faster

## 📝 License

MIT License - Feel free to use and modify!

---

## 🚀 Quick Commands

```bash
# Run everything
dotnet test

# Run smoke tests only (quick validation)
dotnet test --filter "Category=Smoke"

# Run with verbose output
dotnet test -v detailed

# Build and run
dotnet build && dotnet test
```

---

**Created for CloudQA Automation Practice Form**  
URL: https://app.cloudqa.io/home/AutomationPracticeForm
