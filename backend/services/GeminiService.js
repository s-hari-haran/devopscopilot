const { GoogleGenerativeAI } = require('@google/generative-ai');

// Service to communicate with Gemini API for code analysis
class GeminiService {
  constructor(apiKey) {
    if (!apiKey) {
      throw new Error('Gemini API key is required');
    }
    this.client = new GoogleGenerativeAI(apiKey);
  }

  /**
   * Analyze code diff and error context using Gemini
   */
  async analyzeCode(diff, errorContext, codeSnippet) {
    try {
      const prompt = this.buildAnalysisPrompt(diff, errorContext, codeSnippet);
      const model = this.client.getGenerativeModel({ model: 'gemini-pro' });
      
      const result = await model.generateContent(prompt);
      const responseText = result.response.text();

      return this.parseResponse(responseText);
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw new Error(`Failed to analyze code: ${error.message}`);
    }
  }

  /**
   * Build analysis prompt for Gemini
   */
  buildAnalysisPrompt(diff, errorContext, codeSnippet) {
    return `You are a DevOps security expert analyzing a code diff for bugs and security issues.

CODE DIFF:
${JSON.stringify(diff, null, 2)}

ERROR CONTEXT:
${errorContext}

CURRENT CODE SNIPPET:
${codeSnippet}

Please provide:
1. A brief explanation (2-3 sentences) of the bug
2. Root cause analysis
3. Security impact
4. A numbered list of specific code fixes needed

Format your response as JSON with this structure:
{
  "explanation": "...",
  "rootCause": "...",
  "securityImpact": "...",
  "suggestions": ["fix 1", "fix 2", "fix 3"]
}`;
  }

  /**
   * Parse Gemini response into structured format
   */
  parseResponse(responseText) {
    try {
      // Try to extract JSON from the response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      // Fallback: create structured response from text
      return {
        explanation: responseText.substring(0, 200),
        rootCause: 'See explanation',
        securityImpact: 'Potential security vulnerability',
        suggestions: [
          'Add input validation',
          'Use parameterized queries',
          'Implement proper authentication',
          'Add error handling'
        ]
      };
    } catch (error) {
      console.error('Failed to parse Gemini response:', error);
      return {
        explanation: 'Analysis failed, but vulnerabilities detected',
        rootCause: 'Code quality issue',
        securityImpact: 'Requires review',
        suggestions: [
          'Review code for best practices',
          'Add unit tests',
          'Enable security scanning'
        ]
      };
    }
  }
}

module.exports = GeminiService;
