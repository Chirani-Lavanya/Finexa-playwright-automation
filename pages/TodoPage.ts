
import { expect, Locator, Page } from '@playwright/test';

export class TodoPage {
  readonly page: Page;
  readonly newTodoInput: Locator;
  readonly todoItems: Locator;
  readonly itemsLeft: Locator;
  readonly activeFilter: Locator;
  readonly completedFilter: Locator;
  readonly clearCompletedButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.newTodoInput = page.getByPlaceholder(
      'What needs to be done?'
    );

    // Locate todo items in the main todo list.
    this.todoItems = page
      .getByRole('list')
      .filter({ has: page.getByRole('checkbox').first() })
      .getByRole('listitem');

    this.itemsLeft = page.getByText(
      /\d+ items? left!?/i
    );

    this.activeFilter = page.getByRole('link', {
      name: 'Active',
      exact: true,
    });

    this.completedFilter = page.getByRole('link', {
      name: 'Completed',
      exact: true,
    });

    this.clearCompletedButton = page.getByRole('button', {
      name: /clear completed/i,
    });
  }

  async goto(): Promise<void> {
    await this.page.goto('https://demo.playwright.dev/todomvc');

    await expect(this.newTodoInput).toBeVisible();
  }

  async addTodo(text: string): Promise<void> {
    await this.newTodoInput.fill(text);
    await this.newTodoInput.press('Enter');
  }

  todoItem(text: string): Locator {
    return this.todoItems.filter({
      hasText: text,
    });
  }

  async completeTodo(text: string): Promise<void> {
    await this.todoItem(text)
      .getByRole('checkbox')
      .check();
  }

  async deleteTodo(text: string): Promise<void> {
    const item = this.todoItem(text);

    await item.hover();

    // Click the delete button for this todo.
    await item.getByRole('button').click();
  }

  async editTodo(
    oldText: string,
    newText: string
  ): Promise<void> {
    const item = this.todoItem(oldText);

    // Double-click the existing todo text to enter edit mode.
    await item
      .getByText(oldText, { exact: true })
      .dblclick();

    // Find the edit textbox after entering edit mode.
    const editInput = this.page
      .getByRole('textbox')
      .last();

    await expect(editInput).toBeVisible();

    await editInput.fill(newText);
    await editInput.press('Enter');

    // Verify that the updated todo is displayed.
    await expect(
      this.todoItem(newText)
    ).toBeVisible();
  }
}
