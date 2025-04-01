import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import RegisterForm from "../RegisterForm";

describe("🔹 RegisterForm 유닛 테스트", () => {
  test("모든 입력 필드가 렌더링되어야 함", () => {
    render(<RegisterForm />);
    expect(screen.getByPlaceholderText(/유저네임/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/이메일/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/^비밀번호$/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/비밀번호 확인/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/전화번호/i)).toBeInTheDocument();
  });

  test("비밀번호 확인 불일치 시 오류 메시지를 표시해야 함", () => {
    render(<RegisterForm />);

    fireEvent.change(screen.getByPlaceholderText(/^비밀번호$/i), {
      target: { value: "password123" },
    });

    fireEvent.change(screen.getByPlaceholderText(/비밀번호 확인/i), {
      target: { value: "wrongpass" },
    });

    fireEvent.click(screen.getByRole("button", { name: /회원가입/i }));

    expect(
      screen.getByText(/비밀번호가 일치하지 않습니다/i)
    ).toBeInTheDocument();
  });
});