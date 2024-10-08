import React, { useState } from "react";
import { Rnd } from "react-rnd";

import "../styles/AdminPage.css";

const AdminPage = () => {
  const [tables, setTables] = useState([]);
  const [styles, setStyles] = useState({
    fontFamily: "Arial",
    titleFontSize: 36,
    headerFontSize: 24,
    contentFontSize: 16,
    fontColorHeader: "#000000",
    fontColorColumn: "#000000",
    fontColorContent: "#000000",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isBold, setIsBold] = useState();

  // Добавить новую таблицу
  const addNewTable = () => {
    setTables([
      ...tables,
      {
        title: `Table ${tables.length + 1}`, // Название новой таблицы
        headers: ["Limits", "Rake", "Cap", "Min Buy In"], // Изначальные заголовки
        rows: [{ limits: "1$/2$", rake: "5%", cap: "-", minBuyIn: "100$" }], // Изначальные строки
        position: { x: 150, y: 150 },
        size: { width: 400, height: 200 },
      },
    ]);
  };

  // Обновить название таблицы
  const updateTableTitle = (tableIndex, newTitle) => {
    const updatedTables = [...tables];
    updatedTables[tableIndex].title = newTitle;
    setTables(updatedTables);
  };

  // Обновить заголовок столбца
  const updateColumnHeader = (tableIndex, columnIndex, newHeader) => {
    const updatedTables = [...tables];
    updatedTables[tableIndex].headers[columnIndex] = newHeader;
    setTables(updatedTables);
  };

  // Удалить столбец
  const removeColumn = (tableIndex, columnIndex) => {
    const updatedTables = [...tables];
    updatedTables[tableIndex].headers.splice(columnIndex, 1); // Удаляем заголовок
    updatedTables[tableIndex].rows.forEach((row) => {
      delete row[Object.keys(row)[columnIndex]]; // Удаляем соответствующие значения из строк
    });
    setTables(updatedTables);
  };

  // Добавить столбец
  const addColumn = (tableIndex) => {
    const newColumnName = `Column ${tables[tableIndex].headers.length + 1}`;
    const updatedTables = [...tables];
    updatedTables[tableIndex].headers.push(newColumnName);
    updatedTables[tableIndex].rows.forEach((row) => {
      row[newColumnName] = "";
    });
    setTables(updatedTables);
  };

  // Обновить данные ячейки
  const updateCell = (tableIndex, rowIndex, columnKey, newValue) => {
    const updatedTables = [...tables];
    updatedTables[tableIndex].rows[rowIndex][columnKey] = newValue;
    setTables(updatedTables);
  };

  // Удалить строку
  const removeRow = (tableIndex, rowIndex) => {
    const updatedTables = [...tables];
    updatedTables[tableIndex].rows.splice(rowIndex, 1);
    setTables(updatedTables);
  };

  // Добавить строку
  const addRow = (tableIndex) => {
    const newRow = {};
    tables[tableIndex].headers.forEach((header) => {
      newRow[header] = "";
    });
    const updatedTables = [...tables];
    updatedTables[tableIndex].rows.push(newRow);
    setTables(updatedTables);
  };

  return (
    <div className="poker-screen">
      <button className="editButton" onClick={() => setShowPopup(true)}>
        Режим редактирования
      </button>

      {showPopup && (
        <div id="popup" class="popup">
          <button onClick={addNewTable}>Добавить таблицу</button>
          <label>
            Изменять таблицы
            <input
              type="checkbox"
              checked={isEditing}
              onChange={(e) => setIsEditing(e.target.checked)}
            />
          </label>
          <h2>Редактирование стиля</h2>
          {/* Выбор шрифтов */}
          <label>
            Жирные текста
            <input
              type="checkbox"
              checked={isBold}
              onChange={(e) => setIsBold(e.target.checked)}
            />
          </label>
          <label>
            Шрифт таблиц:
            <select
              value={styles.fontFamily}
              onChange={(e) =>
                setStyles({ ...styles, fontFamily: e.target.value })
              }
            >
              <option value="Arial" selected>
                Arial
              </option>
              <option value="Courier New">Courier New</option>
              <option value="Georgia">Georgia</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Verdana">Verdana</option>
              <option value="Impact">Impact</option>
              <option value="Comic Sans MS">Comic Sans MS</option>
              <option value="Trebuchet MS">Trebuchet MS</option>
              <option value="Lucida Console">Lucida Console</option>
            </select>
          </label>
          
          {/* Заголовок таблиц */}
          <label>
            Цвет заголовков таблиц:
            <input
              type="color"
              value={styles.fontColorHeader}
              onChange={(e) =>
                setStyles({ ...styles, fontColorHeader: e.target.value })
              }
            />
          </label>
          <label>
            Тень заголовков таблиц:
            <input
              type="color"
              id="shadowColorTitle"
              value={styles.shadowColorTitle}
              onChange={(e) =>
                setStyles({ ...styles, shadowColorTitle: e.target.value })
              }
            />
          </label>
          <label>
            Размер шрифта заголовков таблиц:
            <input
              type="range"
              min="10"
              max="72"
              value={styles.titleFontSize}
              onChange={(e) =>
                setStyles({ ...styles, titleFontSize: e.target.value })
              }
            />
            <span id="titleFontSizeValue">{styles.titleFontSize}px</span>
          </label>

          {/* Заголовок столбцов */}
          <label>
            Цвет заголовков столбцов:
            <input
              type="color"
              value={styles.fontColorColumn}
              onChange={(e) =>
                setStyles({ ...styles, fontColorColumn: e.target.value })
              }
            />
          </label>
          <label>
            Тень заголовков столбцов:
            <input
              type="color"
              value={styles.shadowColorHeader}
              onChange={(e) =>
                setStyles({ ...styles, shadowColorHeader: e.target.value })
              }
            />
          </label>
          <label>
            Размер шрифта заголовков:
            <input
              type="range"
              min="10"
              max="72"
              value={styles.headerFontSize}
              onChange={(e) =>
                setStyles({ ...styles, headerFontSize: e.target.value })
              }
            />
            <span id="headerFontSizeValue">{styles.headerFontSize}px</span>
          </label>

          
          {/* Содержимое таблиц */}
          <label>
            Цвет содержимого:
            <input
              type="color"
              value={styles.fontColorContent}
              onChange={(e) =>
                setStyles({ ...styles, fontColorContent: e.target.value })
              }
            />
          </label>
          <label>
            Размер шрифта содержимого:
            <input
              type="range"
              id="contentFontSizeSlider"
              min="10"
              max="36"
              value={styles.contentFontSize}
              onChange={(e) =>
                setStyles({ ...styles, contentFontSize: e.target.value })
              }
            />
            <span id="contentFontSizeValue">{styles.contentFontSize}px</span>
          </label>

          

          <label>
            Цвет фона:
            <input
              type="color"
              id="bgColor"
              value={styles.bgColor}
              onChange={(e) =>
                setStyles({ ...styles, bgColor: e.target.value })
              }
            />
          </label>
          

          {/* <div className="popup-buttons">
            <button onClick={applyStyles}>Применить</button>
            <button onClick={() => setShowPopup(false)}>Закрыть</button>
          </div> */}
        </div>
      )}

      {tables.map((table, tableIndex) => (
        <Rnd
          key={tableIndex}
          size={{ width: table.size.width, height: table.size.height }}
          position={{ x: table.position.x, y: table.position.y }}
          onDragStop={(e, d) => {
            const updatedTables = [...tables];
            updatedTables[tableIndex].position = { x: d.x, y: d.y };
            setTables(updatedTables);
          }}
          onResizeStop={(e, direction, ref, delta, position) => {
            const updatedTables = [...tables];
            updatedTables[tableIndex].size = {
              width: ref.style.width,
              height: ref.style.height,
            };
            setTables(updatedTables);
          }}
          bounds="parent"
          style={{
            border: "1px solid #000",
            backgroundColor: `${styles.bgColor}99`, // Полупрозрачный фон
            borderRadius: "20px",
            textAlign: "center",
          }}
          q
        >
          <div>
            <h1
            className="mt-3"
              style={{
                fontFamily: styles.fontFamily,
                color: styles.fontColorHeader,
                fontSize: `${styles.titleFontSize}px`,
                fontWeight: styles.isBold ? "bold" : "normal",
                textShadow: `2px 2px 4px ${styles.shadowColorTitle}`,
              }}
            >
              {table.title}
            </h1>
            <table className="mx-2">
              <thead>
                <tr>
                  {table.headers.map((header, columnIndex) => (
                    <th
                      key={columnIndex}
                      scope="col"
                      style={{
                        fontFamily: styles.fontFamily,
                        color: styles.fontColorColumn,
                        fontSize: `${styles.headerFontSize}px`,
                        fontWeight: styles.isBold ? "bold" : "normal",
                        textShadow: `2px 2px 4px ${styles.shadowColorHeader}`,
                      }}
                    >
                      {isEditing ? (
                        <input
                          type="text"
                          value={header}
                          onChange={(e) =>
                            updateColumnHeader(
                              tableIndex,
                              columnIndex,
                              e.target.value
                            )
                          }
                        />
                      ) : (
                        header
                      )}
                      {isEditing && (
                        <button
                          onClick={() => removeColumn(tableIndex, columnIndex)}
                        >
                          Удалить столбец
                        </button>
                      )}
                    </th>
                  ))}
                  {isEditing && (
                    <th>
                      <button onClick={() => addColumn(tableIndex)}>
                        Добавить столбец
                      </button>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {Object.keys(row).map((columnKey, columnIndex) => (
                      <td
                        key={columnIndex}
                        style={{
                          fontFamily: styles.fontFamily,
                          fontSize: `${styles.contentFontSize}px`,
                          color: styles.fontColorContent,
                          fontWeight: styles.isBold ? "bold" : "normal",
                        }}
                      >
                        {isEditing ? (
                          <input
                            type="text"
                            value={row[columnKey]}
                            onChange={(e) =>
                              updateCell(
                                tableIndex,
                                rowIndex,
                                columnKey,
                                e.target.value
                              )
                            }
                          />
                        ) : (
                          row[columnKey]
                        )}
                      </td>
                    ))}
                    {isEditing && (
                      <td>
                        <button onClick={() => removeRow(tableIndex, rowIndex)}>
                          Удалить строку
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
                {isEditing && (
                  <tr>
                    <td colSpan={table.headers.length + 1}>
                      <button onClick={() => addRow(tableIndex)}>
                        Добавить строку
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Rnd>
      ))}
    </div>
  );
};

export default AdminPage;
