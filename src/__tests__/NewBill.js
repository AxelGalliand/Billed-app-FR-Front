/**
 * @jest-environment jsdom
 */

import { screen } from "@testing-library/dom"
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"
import { ROUTES } from "../constants/routes.js"
import mockStore from "../__mocks__/store.js"
import userEvent from "@testing-library/user-event"
describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    test("then it should call the submit function and renders bills page", async() => {
      // config local storage
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee'
      }))
      // generate the dom
      const html = NewBillUI();
      document.body.innerHTML = html;
      // function for the navigation
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname })
      }
      // create a new bill
      const currentNewBill = new NewBill({ document, onNavigate, localStorage, store: mockStore})
      // create fake file
      const file = new File(['facture'], 'facture.png', { type: 'image/png' })
      // call function handleChangeFile of NewBill
      const handleChangeFile = jest.fn((e) => {
        currentNewBill.handleChangeFile(e)
      })
      // select the file input
      const selectFile = screen.getByTestId('file')
      // add event listener to the file input
      selectFile.addEventListener('change', handleChangeFile)
      userEvent.upload(selectFile, file)
      // get the input and set value
      screen.getByTestId('expense-type').value = 'Transports'
      screen.getByTestId('expense-name').value = 'toulouse - marseille'
      screen.getByTestId('datepicker').value = '01/01/2024'
      screen.getByTestId('amount').value = 348
      screen.getByTestId('vat').value = 70
      screen.getByTestId('pct').value = 20
      screen.getByTestId('commentary').value = "test"
      screen.getByTestId('file').value = ""
    })
  })
})
 