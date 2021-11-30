import { Connection } from '@devoxa/prisma-relay-cursor-connection';
import { ApprovedItem } from '@prisma/client';
import config from '../../../config';
import { getApprovedItem as dbGetApprovedItems } from '../../../database/queries';

/**
 * This query retrieves approved items from the database.
 *
 * @param parent
 * @param args
 * @param db
 */
export async function getApprovedItems(
  parent,
  args,
  { db }
): Promise<Connection<ApprovedItem>> {
  let { pagination } = args;

  // Set the defaults for pagination if nothing's been provided
  if (
    !pagination ||
    (pagination.first === undefined && pagination.last === undefined)
  ) {
    pagination = { first: config.app.pagination.approvedItemsPerPage };
  } else {
    // Add some limits to how many items can be retrieved at any one time.
    // These limits are higher than the defaults applied above.
    const maxAllowedResults = config.app.pagination.maxAllowedResults;
    if (pagination.first && pagination.first > maxAllowedResults) {
      pagination.first = maxAllowedResults;
    }
    if (pagination.last && pagination.last > maxAllowedResults) {
      pagination.last = maxAllowedResults;
    }
  }

  return await dbGetApprovedItems(db, pagination, args.filters);
}