#!/usr/bin/env node

import fs from "fs";
import { exec } from "child_process";
import { select, Separator } from "@inquirer/prompts";
import {
  appKindChoices,
  frontendFrameworkChoices,
  backendLanguageChoices,
  nodejsFrameworkChoices,
} from "./choices.js";

const appKind = await select({
  message: "What king of application do you want to build?",
  choices: appKindChoices,
});

switch (appKind) {
  case "Frontend":
    const framework = await select({
      message: "What frontend framework would you like to use?",
      choices: frontendFrameworkChoices,
    });
    switch (framework) {
      case "React":
        const language = await select({
          message: "Would you like to use TypeScript?",
          choices: [
            { name: "Yes", value: "Yes" },
            { name: "No", value: "No" },
          ],
        });
        if (language === "Yes") {
          exec(
            "npm create vite@latest ./ -- --template react-ts",
            (error, stdout, stderr) => {
              if (error) {
                console.error(`Error: ${error.message}`);
                return;
              }
              if (stderr) {
                console.error(`Stderr: ${stderr}`);
                return;
              }
            }
          );
        } else {
          exec(
            "npm create vite@latest ./ -- --template react",
            (error, stdout, stderr) => {
              if (error) {
                console.error(`Error: ${error.message}`);
                return;
              }
              if (stderr) {
                console.error(`Stderr: ${stderr}`);
                return;
              }
            }
          );
        }
    }
    break;
  case "Backend":
    const language = await select({
      message: "What backend language would you like to use?",
      choices: backendLanguageChoices,
    });
    switch (language) {
      case "Node.js":
        const framework = await select({
          message: "Which Node.js backend framework would you like to use?",
          choices: nodejsFrameworkChoices,
        });
        switch (framework) {
          case "Vanilla":
            const config = await select({
              message: "Provide other config", // TODO
              choices: [{}],
            });
            break;
        }
        break;
    }
    break;
  default:
    console.log("Please choose valid options");
}

console.log("Project structure created successfully.");
