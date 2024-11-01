export interface AppComponent {
    render(): string;
    addEvents(): void; // Изменено на void
  }

  //Components.ts