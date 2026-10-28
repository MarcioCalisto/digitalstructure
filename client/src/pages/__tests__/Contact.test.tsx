import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Contact } from "@/components/sections/Contact";

// Mock tRPC
const mockMutate = vi.fn();
const mockIsPending = false;

vi.mock("@/lib/trpc", () => ({
  trpc: {
    contact: {
      send: {
        useMutation: () => ({
          mutate: mockMutate,
          isPending: mockIsPending,
          data: undefined,
        }),
      },
    },
  },
}));

// Mock site config
vi.mock("@/lib/site", () => ({
  siteConfig: {
    name: "Márcio Calisto",
    email: "test@example.com",
    whatsappNumber: "5511999999999",
  },
  getWhatsAppUrl: (
    message = "Olá Márcio, vim pelo seu site e quero conversar sobre um projeto."
  ) => `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`,
}));

describe("Contact form", () => {
  beforeEach(() => {
    mockMutate.mockReset();
  });

  it("renders the contact form with all fields", () => {
    render(<Contact />);

    expect(screen.getByLabelText(/seu nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/seu e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/o que você precisa/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/qual é o processo/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /enviar briefing/i })
    ).toBeInTheDocument();
  });

  it("shows validation errors for empty fields", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    const submitButton = screen.getByRole("button", {
      name: /enviar briefing/i,
    });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/informe seu nome/i)).toBeInTheDocument();
      expect(screen.getByText(/informe um e-mail válido/i)).toBeInTheDocument();
      expect(
        screen.getByText(/conte um pouco mais sobre o projeto/i)
      ).toBeInTheDocument();
    });
  });

  it("shows validation error for short name", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    const nameInput = screen.getByLabelText(/seu nome/i);
    await user.type(nameInput, "A");

    const submitButton = screen.getByRole("button", {
      name: /enviar briefing/i,
    });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/informe seu nome/i)).toBeInTheDocument();
    });
  });

  it("shows validation error for invalid email", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    const emailInput = screen.getByLabelText(/seu e-mail/i);
    await user.type(emailInput, "email-invalido");

    const submitButton = screen.getByRole("button", {
      name: /enviar briefing/i,
    });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/informe um e-mail válido/i)).toBeInTheDocument();
    });
  });

  it("submits form with valid data", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    await user.type(screen.getByLabelText(/seu nome/i), "João Silva");
    await user.type(screen.getByLabelText(/seu e-mail/i), "joao@example.com");
    await user.selectOptions(
      screen.getByLabelText(/o que você precisa/i),
      "Sistema Web"
    );
    await user.type(
      screen.getByPlaceholderText(/qual é o processo/i),
      "Preciso de um sistema para gestão de projetos"
    );

    const submitButton = screen.getByRole("button", {
      name: /enviar briefing/i,
    });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(
        {
          name: "João Silva",
          email: "joao@example.com",
          projectType: "Sistema Web",
          message: "Preciso de um sistema para gestão de projetos",
          honeypot: "",
        },
        expect.any(Object)
      );
    });
  });

  it("honeypot field remains hidden from users", () => {
    render(<Contact />);
    const honeypot = document.getElementById("website");
    expect(honeypot).toBeInTheDocument();
    expect(honeypot).not.toBeVisible();
  });

  it("renders WhatsApp link", () => {
    render(<Contact />);
    const whatsappLink = screen.getByText(/falar pelo whatsapp/i);
    expect(whatsappLink.closest("a")).toHaveAttribute(
      "href",
      "https://wa.me/5511999999999?text=" +
        encodeURIComponent(
          "Olá Márcio, vim pelo seu site e quero conversar sobre um projeto."
        )
    );
  });
});
