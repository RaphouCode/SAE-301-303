import { mergeApplicationConfig } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

const bootstrap = (options?: any) => {
    const finalConfig = options
        ? mergeApplicationConfig(config, options)
        : config;
    return bootstrapApplication(AppComponent, finalConfig);
};

export default bootstrap;
