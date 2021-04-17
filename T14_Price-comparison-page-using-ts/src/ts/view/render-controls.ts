import { USD, EUR, UAH, DEFAULT_MIN_VALUE, DEFAULT_MAX_VALUE } from './../constants/constants';

((): void => {
  const controls: HTMLElement = document.querySelector('#controls');

  const datepicker: string = `
    <input type="date" name="datepicker" id="datepicker" value=${DEFAULT_MIN_VALUE} min=${DEFAULT_MIN_VALUE} max=${DEFAULT_MAX_VALUE}>
  `;

  const selectbox: string = `
    <select name="selectbox" >
      <option value=${EUR}>${EUR}</option>
      <option value=${UAH}>${UAH}</option>
      <option value=${USD} selected>${USD}</option>
    </select>
  `;

  const html: string = `
    ${datepicker}
    ${selectbox}
  `;

  controls.insertAdjacentHTML('afterbegin', html);
})();
