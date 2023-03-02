import { render , screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Counter from "../components/Counter";

describe("Testes no Counter", () => {
    test("Aumentar o contador para 3 quando botão clicado 3x", async () => {
        // renderizar o componente
        render(<Counter />)

        // selecionar o elemento que queremos utilizar
        const increaseButton = screen.getByText("+");

        // interagir com os elementos
        const user = userEvent.setup();
        // três cliques
        await user.click(increaseButton)
        await user.click(increaseButton)
        await user.click(increaseButton)

        // selecionar o elemento que mostra o valor do contador
        const counterValue = screen.getByText("3");

        // assercoes
        expect(counterValue).toBeInTheDocument();
    })
})