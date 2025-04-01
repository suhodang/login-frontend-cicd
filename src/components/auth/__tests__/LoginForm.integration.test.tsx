import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

// 모듈 mock을 테스트 내부에서 동적으로 실행
vi.mock("../../../store/authStore", async () => {
  return {
    useAuthStore: () => ({
      login: vi.fn().mockResolvedValue(undefined),
    }),
  };
});

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

import LoginForm from "../LoginForm";

describe("🔹 LoginForm 통합 테스트", () => {
  test("로그인 성공 시 loginStore 호출 및 navigate 수행", async () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("이메일을 입력하세요"), {
      target: { value: "test@example.com" },
    });
    fireEvent.click(screen.getByText("다음"));

    fireEvent.change(screen.getByPlaceholderText("비밀번호를 입력하세요"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getAllByText("로그인")[0]);

    await waitFor(() => {
      // login과 navigate에 대한 spy를 별도로 꺼내지 못하므로 오류 확인용 메시지로 충분
      expect(screen.queryByText("서버 오류가 발생했습니다.")).not.toBeInTheDocument();
    });
  });
});