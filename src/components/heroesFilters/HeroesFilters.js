import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import store from '../../store';

import {filtersChanged, fetchFilters, selectAll} from "./filtersSlice"
import Spinner from '../spinner/Spinner';
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
    const {filtersLoadingStatus, activeFilter} = useSelector(state => state.filters);
    const filters = selectAll(store.getState());
    const dispatch = useDispatch();
    const {request} = useHttp();
    console.log(filters);

    useEffect(() => {
        dispatch(fetchFilters(request));
    }, [])

    if (filtersLoadingStatus  === "loading") {
        return <Spinner/>;
    } else if (filtersLoadingStatus  === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderFilters = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Фильтры не найдены</h5>
        }
        return arr.map(({name, label, className})=> {
            const btnClass = classNames('btn', className, {
                'active': name === activeFilter
        })
        return <button 
                key={name}
                id={name}
                className={btnClass}
                onClick={() => dispatch(filtersChanged(name))}
                >{label}</button>
    })
}
    const elemetns = renderFilters(filters)

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {elemetns}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;