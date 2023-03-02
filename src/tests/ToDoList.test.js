import { render , screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoList from "../components/TodoList";

describe("Testando componente TodoList.js", () => {
    test("Deve renderizar com o título", () => {
        // renderizar o componente
        render(<TodoList />)

        // selecionar o elemento que queremos utilizar
        const titulo = screen.getByText("Todo List");

        // interagir com os elementos
        // criar assercoes baseadas no comportamento esperado
        expect(titulo).toBeInTheDocument();
    })

    test("Input deve iniciar vazio", () => {
        // renderizar o componente
        render(<TodoList />)

        // selecionar o elemento que queremos utilizar
        const input = screen.getByRole("textbox");

        // interagir com os elementos
        // criar assercoes baseadas no comportamento esperado
        expect(input.value).toBe("");
    })

    test("Deve atualizar o valor do input ao digitar nele", async () => {
        // renderiza o componente
        render(<TodoList />)

        // seleciona o elemento
        const input = screen.getByPlaceholderText("Enter a todo");

        // interagir com os elementos
        const user = userEvent.setup();
        await user.type(input, "bananinha123");

        // criar assercoes baseadas no comportamento esperado
        expect(input).toHaveValue("bananinha123");
    })

    test("Deve renderizar nova tarefa ao digitar e pressionar ENTER", async () => {
        // renderiza o componente
        render(<TodoList />)

        // seleciona o elemento
        const input = screen.getByPlaceholderText("Enter a todo");
        
        // interagir com os elementos
        const user = userEvent.setup();
        await user.type(input, "bananinha123{enter}");

        // seleciona tarefa criada
        const tarefa = screen.getByText("bananinha123");

        // assercoes
        expect(tarefa).toBeInTheDocument();
    })

    test("Tarefa deve ter status alterado quando botão clicado", async () => {
        // renderiza o componente
        render(<TodoList />)

        // seleciona o elemento
        const input = screen.getByPlaceholderText("Enter a todo");
        
        // interagir com os elementos
        const user = userEvent.setup();
        await user.type(input, "bananinha123{enter}");

        // seleciona tarefa criada
        const tarefa = screen.getByText("bananinha123");

        // usuario clica no botao
        const toggleButton = screen.getByText(/toggle/i);
        await user.click(toggleButton);
        
        // assercoes
        expect(tarefa).toHaveStyle("text-decoration: line-through;")
    })

    test("Tarefa deve ser excluída quando o botão de Delete é clicado", async () => {
        // renderiza o componente
        render(<TodoList />)

        // seleciona o elemento
        const input = screen.getByPlaceholderText("Enter a todo");
        
        // interagir com os elementos
        const user = userEvent.setup();
        await user.type(input, "bananinha123{enter}");

        // usuario clica no botao
        const deleteButton = screen.getByText(/delete/i);
        await user.click(deleteButton);

        // seleciona tarefa criada
        const tarefa = screen.queryByText("bananinha123");
        
        // assercoes
        expect(tarefa).not.toBeInTheDocument();
    })
})