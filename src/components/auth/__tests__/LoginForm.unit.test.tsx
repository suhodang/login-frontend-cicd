import { render, screen, fireEvent } from "@testing-library/react";
import LoginForm from "../LoginForm";
import { describe, test, expect } from "vitest";
import { MemoryRouter } from "react-router-dom"; // ✅ 추가

describe("🔹 LoginForm 유닛 테스트", () => {
  test("이메일 입력 필드가 렌더링되어야 함", () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText(/이메일을 입력하세요/i);
    expect(emailInput).toBeInTheDocument();
  });

  test('"다음" 버튼 클릭 시 비밀번호 입력창이 나타나야 함', () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText(/이메일을 입력하세요/i);
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    fireEvent.click(screen.getByText("다음"));

    const passwordInput = screen.getByPlaceholderText(/비밀번호를 입력하세요/i);
    expect(passwordInput).toBeInTheDocument();
  });
});