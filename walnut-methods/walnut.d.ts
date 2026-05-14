/**
 * Walnut Context Type Definitions
 * Provides TypeScript support for custom methods
 */

/**
 * Response object from HTTP requests
 */
export interface ApiResponse {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: any;
  responseTime: number;
}

/**
 * Request options for HTTP methods
 */
export interface RequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string>;
  timeout?: number;
  auth?: {
    type: 'bearer' | 'basic' | 'apiKey';
    token?: string;
    username?: string;
    password?: string;
    key?: string;
    value?: string;
    in?: 'header' | 'query';
  };
}

/**
 * Base context available on all platforms
 */
export interface WalnutBaseContext {
  platform: 'web' | 'api' | 'shared';
  testBaseUrl: string;
  args: any[];
  variableContext: Record<string, any>;
  params: Record<string, any>;

  replacePlaceholders(text: string): string;
  log(message: string): void;
  warn(message: string): void;
  setVariable(name: string, value: any): void;
  getVariable(name: string): any;
}

/**
 * Web context for browser automation via Playwright
 */
export interface WalnutWebContext extends WalnutBaseContext {
  platform: 'web';
  page: any;

  // Element interaction
  click(selector: string): Promise<void>;
  type(selector: string, text: string): Promise<void>;
  fill(selector: string, text: string): Promise<void>;
  selectOption(selector: string, value: string): Promise<void>;
  hover(selector: string): Promise<void>;
  dblclick(selector: string): Promise<void>;
  focus(selector: string): Promise<void>;
  blur(selector: string): Promise<void>;
  pressKey(key: string): Promise<void>;
  drag(sourceSelector: string, targetSelector: string): Promise<void>;
  fileUpload(selector: string, filePath: string): Promise<void>;
  tap(selector: string): Promise<void>;
  check(selector: string): Promise<void>;
  uncheck(selector: string): Promise<void>;
  clear(selector: string): Promise<void>;

  // Navigation
  navigate(url: string): Promise<void>;
  navigateBack(): Promise<void>;
  reload(): Promise<void>;
  goForward(): Promise<void>;
  close(): Promise<void>;

  // Verification
  verifyElementVisible(selector: string): Promise<void>;
  verifyElementHidden(selector: string): Promise<void>;
  verifyTextVisible(text: string): Promise<void>;
  verifyValue(selector: string, expectedValue: string): Promise<void>;
  verifyUrlContains(substring: string): Promise<void>;
  verifyNavigation(urlPattern: string): Promise<void>;

  // Wait
  waitForVisible(selector: string, opts?: any): Promise<void>;
  waitForHidden(selector: string, opts?: any): Promise<void>;
  wait(ms: number): Promise<void>;
  waitForNavigation(opts?: any): Promise<void>;
  waitForUrl(urlPattern: string, opts?: any): Promise<void>;
  waitForAttached(selector: string, opts?: any): Promise<void>;
  waitForDetached(selector: string, opts?: any): Promise<void>;

  // Query
  getText(selector: string): Promise<string>;
  getAttribute(selector: string, attribute: string): Promise<string | null>;
  getInputValue(selector: string): Promise<string>;
  getUrl(): Promise<string>;
  getTitle(): Promise<string>;
  count(selector: string): Promise<number>;
  isVisible(selector: string): Promise<boolean>;
  isEnabled(selector: string): Promise<boolean>;
  isChecked(selector: string): Promise<boolean>;

  // Mouse
  mouseClick(x: number, y: number): Promise<void>;
  mouseMove(x: number, y: number): Promise<void>;
  mouseDrag(fromX: number, fromY: number, toX: number, toY: number): Promise<void>;

  // Layout
  setViewportSize(width: number, height: number): Promise<void>;

  // Tab
  switchToTab(index: number): Promise<void>;
  getTabCount(): Promise<number>;

  // Advanced
  evaluate(script: string): Promise<any>;
  screenshot(opts?: any): Promise<Buffer>;
  scroll(opts?: any): Promise<void>;
  handleDialog(action: 'accept' | 'dismiss', promptText?: string): Promise<void>;
}

/**
 * API context for HTTP request automation
 */
export interface WalnutApiContext extends WalnutBaseContext {
  platform: 'api';

  // HTTP methods
  request(method: string, url: string, body?: any, opts?: RequestOptions): Promise<ApiResponse>;
  get(url: string, opts?: RequestOptions): Promise<ApiResponse>;
  post(url: string, body?: any, opts?: RequestOptions): Promise<ApiResponse>;
  put(url: string, body?: any, opts?: RequestOptions): Promise<ApiResponse>;
  patch(url: string, body?: any, opts?: RequestOptions): Promise<ApiResponse>;
  delete(url: string, opts?: RequestOptions): Promise<ApiResponse>;

  // State
  setHeader(name: string, value: string): void;
  setAuth(type: 'bearer' | 'basic' | 'apiKey', credentials: any): void;
  getCookies(url: string): Promise<any[]>;
  setCookie(cookie: any, url: string): Promise<void>;

  // Response
  extractFromBody(response: ApiResponse, jsonPath: string): any;

  // Assertion
  assertStatus(response: ApiResponse, expected: number): void;
  assertBodyContains(response: ApiResponse, text: string): void;
  assertResponseTime(response: ApiResponse, maxMs: number): void;
  assertHeader(response: ApiResponse, headerName: string, expected: string): void;
  assertBodyEquals(response: ApiResponse, jsonPath: string, expected: any): void;
  assertBodyMatches(response: ApiResponse, jsonPath: string, regex: RegExp): void;
}

/**
 * Shared context for data processing and Node.js operations
 */
export interface WalnutSharedContext extends WalnutBaseContext {
  platform: 'shared';
}

/**
 * Union type for context — discriminated by platform
 */
export type WalnutContext = WalnutWebContext | WalnutApiContext | WalnutSharedContext;
