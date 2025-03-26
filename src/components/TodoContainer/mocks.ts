import { Todo } from "~/types";

export const mockData: Todo[] = Array.from({ length: 10 }, (_, i) => {
  const id = (i + 1).toString();
  const statuses: ("active" | "completed")[] = ["active", "completed"];
  const status = statuses[Math.floor(Math.random() * statuses.length)];

  const tasks = [
    "Рефакторинг компонентов",
    "Добавить лоадер",
    "Исправить баг с анимацией",
    "Оптимизировать запросы",
    "Добавить темную тему",
    "Написать e2e тесты",
    "Обновить документацию",
    "Интегрировать с API",
    "Добавить i18n",
    "Реализовать пагинацию",
    "Настроить CI/CD",
    "Добавить аналитику",
    "Оптимизировать сборку",
    "Исправить консольные ошибки",
    "Добавить PWA поддержку",
    "Обновить зависимости",
    "Реализовать drag-n-drop",
    "Добавить туториал",
    "Настроить кэширование",
    "Улучшить accessibility",
  ];

  const randomTask = tasks[Math.floor(Math.random() * tasks.length)];
  const randomVariant = Math.floor(Math.random() * 5) + 1;

  return {
    id,
    text: `${randomTask} (вариант ${randomVariant})`,
    status,
    createDate: Date.now() - Math.floor(Math.random() * 1000000000),
  };
});
