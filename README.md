
# DRAG and DROP

GH-PAGES: 

Легенда
Вы делаете внутрикорпоративную систему управления задачами и вашему руководству очень нравится подход, который используется в Trello.



Описание
Фактически у вас есть доска, состоящая из колонок, в каждой колонке может быть несколько карточек.

Для упрощения сделаем следующие допущения:

Кол-во колонок фиксировано и равно 3
Новые колонки добавлять нельзя, удалять имеющиеся тоже
Перемещать колонки тоже нельзя
Что же можно:

Добавлять карточки с помощью кнопки 'Add another card'.

Удалять карточки - при наведении на карточку появляется иконка крестик ("\E951"), которая и удаляет карточку (обратите внимание в оригинальном Trello такой операции нет, есть только архивация, но мы для упрощения её ввели):


Перемещать карточки как внутри колонки, так и между колонками.
Процесс перемещения
Внешний вид до переноса (карточка находится на своём месте)


Внешний вид в момент переноса (карточка удаляется из своего начального положения):


Обратите внимание на следующие нюансы:

Внешний вид курсора ('grabbing')
Курсор по отношению к карточке остаётся там, где изначально схватили - не привязывается ни к левому краю, ни к центру, а там, где схватили карточку, т.е. можно схватить за нижний левый угол.


При наведении на другие позиции под карточку выделяется место по высоте равное размеру самой карточке, при это будет карточка ставится "до" или "после" элемента определяется исключительно позицией курсора.


Дополнительные требования:

Храните всё состояние в LocalStorage так, чтобы после обновления страницы внесённые изменения сохранялись
Построение DOM-дерева производите на базе состояния, хранящегося в LocalStorage
Упрощения
В целях упрощения сделайте только:

Возможность хранить текст (картинки, списки, цветовое оформление элементов не нужно)
Перемещение самой карточки (поворот делать не нужно)
Можете также не обрабатывать ситуацию, связанную с выносом элемента за пределы доски
