import React, { type ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import {
  useDocById,
  findFirstSidebarItemLink,
  // @ts-ignore
} from "@docusaurus/plugin-content-docs/client";
import { usePluralForm } from "@docusaurus/theme-common";
import isInternalUrl from "@docusaurus/isInternalUrl";
import { translate } from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";

import type { Props } from "@theme/DocCard";
import Heading from "@theme/Heading";
import type {
  PropSidebarItemCategory,
  PropSidebarItemLink,
} from "@docusaurus/plugin-content-docs";

import styles from "./styles.module.css";
import IconDocumentMetVlakkenEnLijnenErop from "../icons/IconDocumentMetVlakkenEnLijnenErop";
import IconKetting2Schakels from "../icons/IconKetting2Schakels";
import IconLadeArchiefkast from "../icons/IconLadeArchiefkast";

function useCategoryItemsPlural() {
  const { selectMessage } = usePluralForm();
  return (count: number) =>
    selectMessage(
      count,
      translate(
        {
          message: "1 item|{count} items",
          id: "theme.docs.DocCard.categoryDescription.plurals",
          description:
            "The default description for a category card in the generated index about how many items this category includes",
        },
        { count },
      ),
    );
}

function CardContainer({
  className,
  href,
  children,
}: {
  className?: string;
  href: string;
  children: ReactNode;
}): ReactNode {
  return (
    <Link
      href={href}
      className={clsx("card padding--lg", styles.cardContainer, className)}
    >
      {children}
    </Link>
  );
}

function CardLayout({
  className,
  href,
  icon,
  title,
  description,
}: {
  className?: string;
  href: string;
  icon: ReactNode;
  title: string;
  description?: string;
}): ReactNode {
  return (
    <CardContainer href={href} className={className}>
      <Heading as="h3" className={clsx(styles.cardTitle)}>
        {icon} {title}
      </Heading>
      {description && (
        <p className={clsx(styles.cardDescription)}>
          {truncate(description, 250)}
        </p>
      )}
    </CardContainer>
  );
}

function truncate(str: string, maxLength: number): string {
  if (!str) return "";

  if (str.length <= maxLength) return str;

  const sliced = str.slice(0, maxLength);

  const lastEnd = Math.max(
    sliced.lastIndexOf("."),
    sliced.lastIndexOf("!"),
    sliced.lastIndexOf("?"),
  );

  if (lastEnd !== -1) {
    return sliced.slice(0, lastEnd + 1).trim();
  }
  return sliced.trimEnd() + "…";
}

/**
 * Een eigen icoon voor de kaart, uit `sidebar_custom_props.icon` in de
 * frontmatter of `customProps.icon` in `_category_.json`. Geeft null als er
 * geen eigen icoon is; de kaart valt dan terug op het standaardicoon.
 *
 * developer.overheid.nl ondersteunt dezelfde eigenschap, zodat een overzicht
 * met `<DocCardList />` op beide sites dezelfde iconen toont.
 */
function useCustomIcon(
  item: PropSidebarItemLink | PropSidebarItemCategory,
): ReactNode | null {
  const customIcon = item.customProps?.icon;
  const src = useBaseUrl(typeof customIcon === "string" ? customIcon : "");
  if (typeof customIcon !== "string") {
    return null;
  }
  return (
    <img src={src} className={styles.cardIcon} alt="" aria-hidden="true" />
  );
}

function CardCategory({ item }: { item: PropSidebarItemCategory }): ReactNode {
  const href = findFirstSidebarItemLink(item);
  const categoryItemsPlural = useCategoryItemsPlural();
  const customIcon = useCustomIcon(item);

  // Unexpected: categories that don't have a link have been filtered upfront
  if (!href) {
    return null;
  }

  return (
    <CardLayout
      className={item.className}
      href={href}
      icon={customIcon ?? <IconLadeArchiefkast className={styles.cardIcon} />}
      title={item.label}
      description={item.description ?? categoryItemsPlural(item.items.length)}
    />
  );
}

function CardLink({ item }: { item: PropSidebarItemLink }): ReactNode {
  const customIcon = useCustomIcon(item);
  const icon = customIcon ?? (isInternalUrl(item.href) ? (
    <IconDocumentMetVlakkenEnLijnenErop className={styles.cardIcon} />
  ) : (
    <IconKetting2Schakels className={styles.cardIcon} />
  ));
  const doc = useDocById(item.docId ?? undefined);
  return (
    <CardLayout
      className={item.className}
      href={item.href}
      icon={icon}
      title={item.label}
      description={item.description ?? doc?.description}
    />
  );
}

export default function DocCard({ item }: Props): ReactNode {
  switch (item.type) {
    case "link":
      return <CardLink item={item} />;
    case "category":
      return <CardCategory item={item} />;
    default:
      throw new Error(`unknown item type ${JSON.stringify(item)}`);
  }
}
