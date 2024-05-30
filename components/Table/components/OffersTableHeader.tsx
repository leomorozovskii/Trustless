import { useTranslation } from 'react-i18next';
import { Button } from '@radix-ui/themes';

import { SearchIcon } from '@assets/icons';
import { Input } from '@components/Input';
import { Pagination } from '@components/Pagination';

import s from '../Table.module.scss';

interface OffersTableHeaderProps {
  searchValue: string;
  onSearch: (value: string) => void;
  pageIndex: number;
  pageSize: number;
  data: any[];
  previousPage: () => void;
  nextPage: () => void;
  canPreviousPage: boolean;
  canNextPage: boolean;
}

export const OffersTableHeader: React.FC<OffersTableHeaderProps> = ({
  searchValue,
  onSearch,
  pageIndex,
  pageSize,
  data,
  previousPage,
  nextPage,
  canPreviousPage,
  canNextPage,
}) => {
  const { t } = useTranslation();

  return (
    <div className={s.tableHeader}>
      <div className={s.searchContainer}>
        <Button className={s.cancelButton}>{t('offers.cancelOffer')}</Button>
        <Input
          icon={<SearchIcon />}
          size="md"
          value={searchValue}
          type="text"
          placeholder={t('offers.offerIdOrAsset')}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <Pagination
        startRow={pageIndex * pageSize + 1}
        endRow={(pageIndex + 1) * pageSize}
        totalRows={data.length}
        previousPage={previousPage}
        nextPage={nextPage}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
      />
    </div>
  );
};
