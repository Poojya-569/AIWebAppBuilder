import { askGemini } from './gemini.service.js';
import { getProjectById } from './project.service.js';
import { buildGenerationPrompt } from '../constants/prompts.js';
import { parseGenerationResponse } from '../utils/code.utils.js';

export const generateCode = async (projectId, userId, userPrompt) => {
  const project = await getProjectById(projectId, userId);

  const fullPrompt = buildGenerationPrompt(
    project.messages,
    project.generatedCode,
    userPrompt
  );

  const aiResponse = await askGemini(fullPrompt);

  let description = null;
  let code = null;

  // ✅ SAFETY CHECK (this fixes your crash)
  if (aiResponse) {
    const parsed = parseGenerationResponse(aiResponse);
    description = parsed.description;
    code = parsed.code;
  } else {
    console.log('Gemini unavailable, using fallback');
    description = 'AI service is currently unavailable. Please try again later.';
  }

  project.messages.push({
    role: 'user',
    content: userPrompt,
    timestamp: new Date(),
  });

  project.messages.push({
    role: 'assistant',
    content: description || 'Here is your generated code.',
    timestamp: new Date(),
  });

  if (project.generatedCode && code) {
    project.versions.push({
      code: project.generatedCode,
      prompt: userPrompt,
      createdAt: new Date(),
    });
  }

  if (code) {
    project.generatedCode = code;
  }

  if (project.title === 'Untitled Project' && project.messages.length <= 2) {
    project.title = userPrompt.length > 50
      ? userPrompt.substring(0, 50) + '...'
      : userPrompt;
  }

  project.updatedAt = new Date();
  await project.save();

  return {
    message: {
      role: 'assistant',
      content: description || 'Here is your generated code.',
      timestamp: new Date(),
    },
    generatedCode: project.generatedCode,
    versionIndex: project.versions.length,
  };
};