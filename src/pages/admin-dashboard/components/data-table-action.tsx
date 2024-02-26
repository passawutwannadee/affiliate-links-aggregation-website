import { Sheet } from '@/components/ui/sheet';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MousePointerSquare } from 'lucide-react';
import UserActionDetails from '../users-report/user-action-details';
import ProductActionDetails from '../products-report/product-action-details';
import CollectionActionDetails from '../collections-report/collection-action-details';
import AppealActionDetails from '../ban-appeal/appeal-action.details';

export type Data = {
  report_id?: number;
  appeal_id?: number;
  ticket_status_id: number;
  report_information?: string;
  reporter_email?: string;
  user_id: number;
  product_id?: number;
  collection_id?: number;
  ban_id?: number;
  ban_reason_detail?: string;
  appeal_information?: string;
  username: string;
  user_report_category?: string;
  product_report_category?: string;
  collection_report_category?: string;
  ban_reason?: string;
};

interface Props {
  info: Data;
}

export function TableAction({ info }: Props) {
  const handleDetailsClose = () => {
    setDetailsOpen(false);
  };

  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <>
      {info.ticket_status_id === 1 ? (
        <Button onClick={() => setDetailsOpen(true)} className="w-12 h-8">
          <MousePointerSquare />
        </Button>
      ) : (
        <Button disabled className="w-12 h-8">
          <MousePointerSquare />
        </Button>
      )}
      <Sheet open={detailsOpen} onOpenChange={setDetailsOpen}>
        {/* user if doesn't provide product_id and collection_id */}
        {!info.product_id && !info.collection_id ? (
          <UserActionDetails
            closeSheet={handleDetailsClose}
            username={info.username!}
            reportId={info.report_id!}
            reporterEmail={info.reporter_email!}
            reportedUser={info.username!}
            reportReason={info.user_report_category!}
            reportInformation={info.report_information!}
            userId={info.user_id}
          />
        ) : null}

        {/* product if provide product_id*/}
        {info.product_id ? (
          <ProductActionDetails
            closeSheet={handleDetailsClose}
            productId={info.product_id}
            reportId={info.report_id!}
            reporterEmail={info.reporter_email!}
            reportedUser={info.username!}
            reportReason={info.product_report_category!}
            reportInformation={info.report_information!}
            userId={info.user_id}
          />
        ) : null}

        {/* collection if provide collection_id*/}
        {info.collection_id ? (
          <CollectionActionDetails
            closeSheet={handleDetailsClose}
            collectionId={info.collection_id}
            reportId={info.report_id!}
            reporterEmail={info.reporter_email!}
            reportedUser={info.username!}
            reportReason={info.collection_report_category!}
            reportInformation={info.report_information!}
            userId={info.user_id}
          />
        ) : null}

        {/* appeal if provide ban_id*/}
        {info.ban_id ? (
          <Sheet open={detailsOpen} onOpenChange={setDetailsOpen}>
            <AppealActionDetails
              closeSheet={handleDetailsClose}
              banId={info.ban_id}
              appealId={info.appeal_id!}
              userId={info.user_id}
              username={info.username!}
              banReason={info.ban_reason!}
              banReasonDetail={info.ban_reason_detail!}
              appealInformation={info.appeal_information!}
            />
          </Sheet>
        ) : null}
      </Sheet>
    </>
  );
}
