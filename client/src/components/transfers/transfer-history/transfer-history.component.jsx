import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// Redux actions
import { getUsersTransfers } from '../../../store/actions/transfers.actions';

// Components
import TransferItem from '../transfer-item/transfer-item.component';

// import classes from './transfer-history.module.css';

const transfers = [];

const TransferHistory = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getUsersTransfers());
	}, [dispatch]);

	return (
		<div>
			{transfers &&
				transfers.map(transfer => <TransferItem transfer={transfer} />)}
		</div>
	);
};

export default TransferHistory;
