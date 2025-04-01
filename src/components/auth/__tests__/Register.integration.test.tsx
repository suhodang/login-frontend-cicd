import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

// ✅ 먼저 모킹에 쓸 함수 선언
const registerApiMock = vi.fn();

// ✅ 모듈 mock은 선언된 함수 이후에 정의
vi.mock("../../../api/auth", () => ({
  registerApi: registerApiMock,
}));

import RegisterForm from "../RegisterForm";

describe("🔹 RegisterForm 통합 테스트", () => {
  test("회원가입 성공 시 메시지 출력", async () => {
    registerApiMock.mockResolvedValue({
      data: { message: "회원가입 완료" },
    });

    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("유저네임"), {
      target: { value: "tester" },
    });
    fireEvent.change(screen.getByPlaceholderText("이메일"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("비밀번호"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("비밀번호 확인"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /회원가입/i }));

    await waitFor(() => {
      expect(registerApiMock).toHaveBeenCalled();
      expect(screen.getByText("회원가입 완료")).toBeInTheDocument();
    });
  });
});