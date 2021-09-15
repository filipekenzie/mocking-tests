import axios from 'axios';

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Pokemon from '../components/Pokemon';

jest.mock("axios");
const mockedAxios = axios;

describe("When the user enters a valid pokemon", () => {
    test("Should show the pokemon abilities", async () => {

        //Parte 1 - Construindo o Mock
        const abilities = [
            {
                ability:{
                    name: "Ability Foo",
                    url: "http://foo.foo"
                }
            }
        ]

        mockedAxios.get.mockResolvedValueOnce({data: {abilities}})

        //Testando o comportamento do usuário
        render(<Pokemon />)

        userEvent.type(screen.getByRole("textbox"), "Pokemon Foo");
        userEvent.click(screen.getByRole("button"));

        const returnAbilities = await screen.findAllByRole("listitem");

        expect(returnAbilities).toHaveLength(1);

    })
})

describe("When the user enters an invalid pokemon name", () => {
    test("Should show an error message on the screen", async () => {

        mockedAxios.get.mockRejectedValueOnce(new Error());

        render(<Pokemon/>);

        userEvent.type(screen.getByRole("textbox"), "Pokemon Invalid Foo");
        userEvent.click(screen.getByRole("button"));

        const message  = await screen.findByText(/Something went wrong/);

        expect(message).toBeInTheDocument();

    })
})